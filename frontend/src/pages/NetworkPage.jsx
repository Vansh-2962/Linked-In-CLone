import { useQuery } from "@tanstack/react-query";
import { axiosInstance as axios } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import { User } from "lucide-react";
import FriendRequest from "../components/FriendRequest";
import UserCard from "../components/UserCard";
const NetworkPage = () => {
  const { data: user } = useQuery({ queryKey: ["authUser"] });
  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: () => axios.get("/connections/requests"),
  });

  const { data: connections } = useQuery({
    queryKey: ["connections"],
    queryFn: () => axios.get("/connections"),
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="col-span-1 lg:col-span-1">
        <Sidebar user={user} />
      </div>
      <div className="col-span-1 lg:col-span-3">
        <div className="bg-base-100 rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold mb-6">My Network</h1>
          {connectionRequests?.data?.length > 0 ? (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">
                Connections Requests
              </h2>
              <div className="space-y-4">
                {connectionRequests?.data?.map((request) => (
                  <FriendRequest key={request._id} request={request} />
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-base-200 rounded-lg shadow p-6 text-center mb-6">
              <User size={50} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                No Connection requests
              </h3>
              <p className="text-gray-600 mt-2">
                Explore suggested connection below to expand your network!
              </p>
            </div>
          )}
          {connections?.data?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">My Connections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {connections.data.map((connection) => (
                  <UserCard
                    key={connection._id}
                    user={connection}
                    isConnection={true}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default NetworkPage;
