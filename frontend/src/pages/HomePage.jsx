import { useQuery } from "@tanstack/react-query";
import { axiosInstance as axios } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import Sidebar from "../components/Sidebar.jsx";
import PostCreation from "../components/PostCreation.jsx";
import Post from "../components/Post.jsx";
import RecommendedUser from "../components/RecommendedUser.jsx";
import { Loader } from "lucide-react";

const HomePage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommended-users"],
    queryFn: async () => {
      try {
        const res = await axios.get("/users/suggestions");
        return res.data;
      } catch (error) {
        toast.error(error.response.data.message || "Something went wrong");
      }
    },
  });
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get("/posts");
      return res.data;
    },
  });

  console.log(posts);
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 ">
      <div className="hidden lg:block lg:col-span-1">
        <Sidebar user={authUser} />
      </div>
      <div className="col-span-1 lg:col-span-2 order-first lg:order-none">
        <PostCreation user={authUser} />
        {isLoading ? (
          <Loader size={30} className="animate-spin  w-full" />
        ) : (
          posts?.map((post) => (
            <div key={post._id}>
              <Post key={post._id} post={post} />
            </div>
          ))
        )}
        {posts?.length === 0 && (
          <div className="text-center text-gray-500 text-lg mt-10">
            No posts yet
          </div>
        )}
      </div>
      {recommendedUsers?.length > 0 && (
        <div className="col-span-1 lg:col-span-1 hidden lg:block">
          <div className="bg-base-100 rounded-lg shadow p-4">
            <h2 className="font-semibold mb-4">People you may know</h2>
            {recommendedUsers?.map((user) => (
              <RecommendedUser key={user._id} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default HomePage;
