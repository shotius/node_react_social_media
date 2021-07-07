import {postRepo} from "../../repository/items/Post";
import {Post} from "../../public/models/items/Post";
import {StatusCodes} from "http-status-codes";
import {WithItemResponse} from "../../public/responses/BaseResponse";
import {PostsResponse} from "../../public/responses/items/PostResponses";
import {userService} from "../users/User";
import {photoRepo} from "../../repository/photos/Photo";
import {utilService} from "../utility/Utility";

const {INTERNAL_SERVER_ERROR, CREATED, FORBIDDEN, NOT_FOUND} = StatusCodes;

class PostService {
    public async getPostById(postId: number) {
        return await postRepo.getPostById(postId);
    }

    public async createNewPost(post: Post): Promise<WithItemResponse> {
        try {
            const {user} = await userService.findUserById(post.userId);
            const item = await user.createItem({
                itemType: post.itemType
            })
            const createdPost = await item.createPost({
                content: post.content
            })
            // create photos
            const photos = await photoRepo.createNewPhotos(post.images);
            await createdPost.addPhotos(photos);

            const createdPostWithAllFields = await this.getPostById(createdPost.id);

            return Promise.resolve({
                code: CREATED,
                success: true,
                post: createdPostWithAllFields.post,
            })

        } catch (err) {
            console.log(err);
            return Promise.resolve({
                code: INTERNAL_SERVER_ERROR,
                success: false,
                message: err.message
            })
        }
    }

    public async getAllPosts(where = {}): Promise<PostsResponse> {
        return await postRepo.getAllPosts(where);
    }

    public async deletePostById(postId: number, userId: number) {
        // const {user} = await userService.findUserById(userId);
        const postResponse = await this.getPostById(postId);
        if (!postResponse.post) {
            return Promise.resolve({
                code: NOT_FOUND,
                success: false,
                message: 'Post not found'
            })
        }
        const isPostBelongsToUser = await utilService.isPostBelongsToUser(userId, postId);
        // const uId = JSON.parse(JSON.stringify(postResponse.post)).userId;
        if (!isPostBelongsToUser) {
            return Promise.resolve({
                code: FORBIDDEN,
                success: false,
                message: 'Forbidden'
            })
        }
        return await postRepo.deletePostById(postId);
    }

    public async editPost(postId: number, userId: number, postData: Post) {
        // console.log(postId, 'POST ID');
        // console.log(userId, 'USER ID');
        // console.log(postData, 'POST DATA');
        const postResponse = await this.getPostById(postId);
        if (!postResponse.post) {
            return Promise.resolve({
                code: NOT_FOUND,
                success: false,
                message: 'Post not found'
            })
        }
        const belongsUser = await utilService.isPostBelongsToUser(userId, postId);
        if (!belongsUser) {
            return Promise.resolve({
                code: FORBIDDEN,
                success: false,
                message: 'Forbidden'
            })
        }
        return await postRepo.editPost(postId, postData);
        // return Promise.resolve('Resolve');
    }

    public async removePostPhotos(postId: number) {
        return await postRepo.removePostPhotos(postId);
    }
}

export const postService = new PostService();