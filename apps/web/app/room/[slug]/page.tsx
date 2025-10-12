import axios from "axios";
import { BACKEND_URL } from "../../config";
import ChatRoom from "../../components/ChatRoom";

async function getRoom(slug:string) {
  const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
  return  response.data.room.id;

}
const page = async ({ params } : {
  params: {
    slug : string
  }
}) => {
   const { slug } = await params;
  const roomId = await getRoom(slug)

  return <ChatRoom id={roomId}></ChatRoom>;
};

export default page;
