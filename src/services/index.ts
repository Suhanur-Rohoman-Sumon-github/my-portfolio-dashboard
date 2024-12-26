/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
export const getMyProjects = async () => {
  const { data } = await axios.get(`https://my-portfolio-ten-sepia-53.vercel.app/api/v1/universal/get-projects`);
  return data.data; 
};
export const getSingleProjects = async (projectId:string) => {
  const { data } = await axios.get(`https://my-portfolio-ten-sepia-53.vercel.app/api/v1/universal/get-projects/${projectId}`);
  return data.data; 
};

export const createMyProjects = async (projectData:any) => {
  const { data } = await axios.post(`https://my-portfolio-ten-sepia-53.vercel.app/api/v1/universal/create-projects`,projectData);
  return data.data; 
};
export const getMyBlogs = async () => {
  const { data } = await axios.get(`https://my-portfolio-ten-sepia-53.vercel.app/api/v1/universal/get-blogs`);
  return data.data; 
};
export const getSingleBlogs = async (blogId:string) => {
  const { data } = await axios.get(`https://my-portfolio-ten-sepia-53.vercel.app/api/v1/universal/get-blogs/${blogId}`);
  return data.data; 
};

export const createBlogs = async (projectData:any) => {
  const { data } = await axios.post(`https://my-portfolio-ten-sepia-53.vercel.app/api/v1/universal/create-blogs`,projectData);
  return data.data; 
};
export const getAllExperience = async () => {
  const { data } = await axios.get(`https://my-portfolio-ten-sepia-53.vercel.app/api/v1/universal/get-experience`);
  return data.data; 
};


export const createExperience = async (experienceData:any) => {
   try {
   const { data } = await axios.post(`https://my-portfolio-ten-sepia-53.vercel.app/api/v1/universal/create-experience`,experienceData);
  return data.data; 
  } catch (error: any) {
     if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message)}
      console.log(error);
  }
};