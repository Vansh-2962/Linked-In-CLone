import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance as axios } from "../lib/axios.js";
import toast from "react-hot-toast";
import { Image, Loader } from "lucide-react";

const PostCreation = ({ user }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageReview, setImageReview] = useState("");
  const queryClient = useQueryClient();
  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: async (postData) => {
      const res = await axios.post("/posts/create", postData, {
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    },
    onSuccess: () => {
      resetForm();
      toast.success("Post created");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  const handlePostCreation = async () => {
    try {
      const postData = { content };
      if (image) {
        postData.image = await readFileAsDataUrl(image);
      }
      createPostMutation(postData);
    } catch (error) {
      console.log("Error in post creation : ", error);
    }
  };

  const resetForm = () => {
    setContent("");
    setImage(null);
    setImageReview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      readFileAsDataUrl(file).then(setImageReview);
    } else {
      setImageReview(null);
    }
  };

  const readFileAsDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="bg-base-100 rounded-lg shadow mb-4 p-4">
      <div className="flex space-x-3">
        <img
          src={user.profilePicture || "/avatar.png"}
          alt={user.name}
          className="size-12 rounded-full"
        />
        <textarea
          placeholder="What's on your mind?"
          className="w-full p-3 rounded-lg bg-base-200 hover:bg-base-200 focus:bg-base-200 focus:outline-none resize-none transition-colors duration-200 min-h-[100px] "
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      {imageReview && (
        <div className="mt-4 flex items-center justify-center">
          <img
            src={imageReview}
            alt="Selected"
            className="w-1/2 h-auto rounded-lg"
          />
        </div>
      )}
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4">
          <label className="flex items-center text-neutral hover:text-info-dark transition-colors duration-200 cursor-pointer">
            <Image size={20} className="mr-2" />
            <span>Photo</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <button
          className="btn btn-secondary text-md"
          onClick={handlePostCreation}
          disabled={isPending}
        >
          {isPending ? <Loader className="size-5 animate-spin " /> : "Share"}
        </button>
      </div>
    </div>
  );
};
export default PostCreation;
