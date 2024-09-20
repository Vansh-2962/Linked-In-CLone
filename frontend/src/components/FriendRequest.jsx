import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance as axios } from "../lib/axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const FriendRequest = ({ request }) => {
  const queryClient = useQueryClient();
  const { mutate: acceptConnectionRequest } = useMutation({
    mutationFn: (requestId) => axios.put(`/connections/accept/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request accepted");
      queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
    },
    onError: () => {
      toast.error(error.response.data.message);
    },
  });
  const { mutate: rejectConnectionRequest } = useMutation({
    mutationFn: (requestId) => axios.put(`/connections/reject/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request rejected");
      queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
    },
    onError: () => {
      toast.error(error.response.data.message);
    },
  });

  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between transition-all hover:shadow-md">
      <div className="flex items-center gap-4 justify-between w-full">
        <div className="flex items-center gap-4">
          <Link to={`/profile/${request.sender.username}`}>
            <img
              src={request.sender.profilePicture || "/avatar.png"}
              alt={request.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          </Link>
          <div>
            <Link
              to={`/profile/${request.sender.username}`}
              className="font-semibold text-lg"
            >
              {request.sender.name}
            </Link>
            <p className="text-gray-600">{request.sender.headline}</p>
          </div>
        </div>
        <div className="space-x-2">
          <button
            className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            onClick={() => acceptConnectionRequest(request._id)}
          >
            Accept
          </button>
          <button
            className="bg-white border border-secondary  text-secondary px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition-colors"
            onClick={() => rejectConnectionRequest(request._id)}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};
export default FriendRequest;
