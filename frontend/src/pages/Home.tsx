import React from "react";
import Sidebar from "../components/molecules/Sidebar";
import Stories from "../components/molecules/Stories";
import Header from '../components/organizms/Header'
import PostsOnHome from "../components/organizms/PostsOnHome";
// import { HomeTemplate } from "../components/templates/HomeTemplate";

console.log('Home')

 const Home: React.FC = () =>  {
  return (
    <>
      <Header />
      <Sidebar />
      <PostsOnHome />
      <Stories />
    </>
  );
}
export default Home