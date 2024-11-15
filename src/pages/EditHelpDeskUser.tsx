import { format } from "date-fns";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import Back from "../components/common/Back";
import { endpoints } from "../data/endpoints";
import { io, Socket } from "socket.io-client";
import { includes } from "../utils/polyfills";
import { Fetch, Post } from "../utils/apiUtils";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import SkeletonLoader from "../components/common/SkeletonLoader";
import { toast } from "react-toastify";

const ticketStatuses = [
  { label: "Closed", value: "closed" },
  { label: "On Hold", value: "on_hold" },
  { label: "Resolved", value: "resolved" },
  { label: "In Progress", value: "in_progress" },
];

const EditHelpDeskUser = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const socket = useRef<Socket | null>(null);

  const [data, setData] = useState(state);
  const [localState, setLocalState] = useState({
    action: "commented",
    ticketId: state?._id,
    agentId: state?.assignee?._id,
    userId: state?.requester?._id,
  });
  const [list, showList] = useState(false);
  const [agents, setAgents] = useState([]);
  const [message, setMessage] = useState("");
  const [agentId, setAgentId] = useState("");
  const [loading, setLoading] = useState(state ? false : true);
  const [dataFetched, setDataFetched] = useState(state ? true : false);
  const [interaction, setInteraction] = useState(state?.interactions);
  const userRole = useSelector((state: RootState) => state.auth.user.role);

  const [senderId, setSenderID] = useState(
    includes(["vendor", "user"], userRole)
      ? state?.requester?._id
      : state?.assignee?._id
  );
  const [receiverId, setReceiverID] = useState(
    includes(["admin"], userRole) ? state?.requester?._id : state?.assignee?._id
  );

  useEffect(() => {
    const fetchAgents = async () => {
      const resp: any = await Fetch(
        "ticket/agents?availability=true",
        {},
        5000,
        true,
        false
      );
      if (resp?.success) setAgents(resp.data?.result ?? []);
    };
    if (data && !data?.assignee && dataFetched) fetchAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataFetched]);

  const setState = (resp: any) => {
    setData(resp.data);
    setLoading(false);
    setLocalState({
      action: "commented",
      ticketId: resp.data?._id,
      agentId: resp.data?.assignee?._id,
      userId: resp.data?.requester?._id,
    });
    setInteraction(resp?.data?.interactions);
    setSenderID(
      includes(["vendor", "user"], userRole)
        ? resp.data?.requester?._id
        : resp.data?.assignee?._id
    );
    setReceiverID(
      includes(["admin"], userRole)
        ? resp.data?.requester?._id
        : resp.data?.assignee?._id
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchUrl = `${endpoints["HelpDesk"].read}${id}`;
      const resp: any = await Fetch(fetchUrl);
      if (resp?.success) {
        console.log(resp);
        setData(resp.data);
        setState(resp);
        setDataFetched(true);
      }
    };
    if (!state && id) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, state]);

  useEffect(() => {
    if (
      socket.current === null &&
      data?.status !== "closed" &&
      data?.assignee
    ) {
      socket.current = io("http://localhost:8081");

      if (senderId) {
        socket.current.emit("addUser", senderId);
      }

      socket.current.on("getMessage", (data) => {
        if (data?.senderId === receiverId) {
          const isAdmin = ["admin"].includes(userRole);
          const isUserOrVendor = ["vendor", "user"].includes(userRole);

          const receiverType = isAdmin ? "Agent" : "User";
          const initiatorType = isUserOrVendor ? "Agent" : "User";

          const obj = {
            receiverType,
            initiatorType,
            isSender: false,
            content: data?.text,
            receiver: senderId,
            timestamp: new Date(),
            initiator: receiverId,
            action: localState.action,
          };
          setInteraction((prev: any[]) => [...prev, obj]);
        }
      });
    }
    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senderId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const isAdmin = ["admin"].includes(userRole);
    const isUserOrVendor = ["vendor", "user"].includes(userRole);

    const receiverType = isAdmin ? "User" : "Agent";
    const initiatorType = isUserOrVendor ? "User" : "Agent";

    const obj = {
      receiverType,
      initiatorType,
      isSender: true,
      content: message,
      initiator: senderId,
      receiver: receiverId,
      timestamp: new Date(),
      action: localState.action,
    };

    setInteraction((prev: any[]) => [...prev, obj]);

    const response: any = await Post("ticket/tickets/interactions", {
      content: message,
      initiator: senderId,
      action: obj?.action,
      receiver: receiverId,
      ticketId: localState.ticketId,
    });

    if (response?.success) {
      const messageData = {
        text: message,
        senderId: senderId,
        receiverId: receiverId,
      };
      if (socket.current) socket.current.emit("sendMessage", messageData);
      setMessage("");
      return true;
    } else {
      console.error("Failed to submit interaction.");
    }
  };

  const handleChangeStatus = async (status: string) => {
    if (localState?.ticketId && status) {
      const response: any = await Fetch(
        "ticket/tickets/" + localState?.ticketId + "/" + status
      );
      if (response?.success && response?.message === "updated")
        setState(response);
      else toast.warn(response?.message);
    }
  };

  const showListOfStatus = () => {
    showList(!list);
  };

  const handleAssignManually = async (e: any) => {
    e.preventDefault();
    if (!agentId) return toast.warn("Please select a agent");
    if (localState?.ticketId && agentId) {
      try {
        const resp: any = await Post("ticket/tickets/manually-assigned", {
          agentId: agentId,
          ticketId: localState?.ticketId,
        });
        if (resp?.success) setState(resp);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  if (loading && id) return <SkeletonLoader />;

  return (
    <>
      <Back link="/help-desk" />
      <div className="p-5 pt-3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="inline-flex items-center gap-2 text-2xl font-bold capitalize">
            Ticket ({data?.status.split("_").join(" ")})
            <p className="flex gap-1 items-center w-fit text-xs">
              {data?.tags.map((tag: string, index: number) => {
                return (
                  <span
                    key={index}
                    className="px-2 w-fit bg-blue-300 text-white py-1 rounded"
                  >
                    {tag}
                  </span>
                );
              })}
            </p>
          </h2>
          {!data.assignee && (
            <form onSubmit={handleAssignManually}>
              <select
                required
                onChange={(e) => setAgentId(e.target.value)}
                className="outline-none border border-gray-500 mr-4 p-2 rounded-md"
              >
                <option value="">-- Select Agent --</option>
                {agents.map((agent: any, index: number) => (
                  <option key={index} value={agent._id}>
                    {agent.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-[#3D57B0] text-white px-4 py-2 rounded-md"
              >
                + Assign Manually
              </button>
            </form>
          )}
        </div>
        <div className="bg-blue-200 px-4 py-3 rounded-md">
          <div className="flex text-primary font-bold justify-between items-start">
            <div>
              <h2>Requester : {data?.requester?.name}</h2>
            </div>
            <p className="text-sm">
              Due date : {format(data?.dueDate, "do MMMM, yyyy")}
            </p>
          </div>
          <div className="flex justify-between items-center mt-2 gap-5">
            <span className="uppercase font-semibold">
              #{data?._id?.slice(-8)}
            </span>
            <span className="text-lg">
              <span className="capitalize font-semibold">
                Issue : {data?.title}
                <br />
              </span>
              <span className="text-base font-semibold">
                - {data?.description}
                <br />
              </span>
            </span>
            <span className="flex relative items-center gap-1">
              <span className="capitalize text-sm bg-[#3D57B0] text-white px-3 font-semibold py-1 rounded-md">
                {data?.status.split("_").join(" ")}
              </span>
              {userRole === "admin" && data?.status !== "closed" && (
                <IoIosArrowDropdownCircle
                  onClick={showListOfStatus}
                  size={25}
                  className="text-[#3D57B0]"
                />
              )}
              {list && (
                <ul className="absolute top-8 right-7 rounded-md text-white overflow-hidden">
                  {ticketStatuses.map((status: any, index: number) => {
                    return (
                      <li
                        key={index}
                        onClick={() => handleChangeStatus(status?.value)}
                        className="px-4 py-2 border-b whitespace-nowrap border-b-slate-50 bg-[#3D57B0] hover:bg-[#3D57B0]/80 cursor-pointer"
                      >
                        {status?.label}
                      </li>
                    );
                  })}
                </ul>
              )}
            </span>
          </div>
        </div>
        <div>
          {data && interaction && interaction.length > 0 && (
            <div>
              {interaction.map((interact: any) => {
                const isReceiver = interact?.receiverType === "User";
                const sender = isReceiver ? data?.assignee : data?.requester;
                return (
                  <div
                    key={interact?.timestamp}
                    className={`p-4 rounded-md mt-2 ${
                      interact?.isSender ? "bg-blue-200" : "bg-slate-100"
                    }`}
                  >
                    <span className="flex justify-between items-center gap-5">
                      <span className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-blue-400 text-white flex justify-center items-center">
                          {sender?.name.charAt(0)}
                        </span>
                        <span className="text-xl font-semibold">
                          {sender?.name} {interact?.isSender && "(You)"}
                        </span>
                      </span>
                      <span className="text-sm bg-blue-400 text-white px-2 py-px rounded-md">
                        {interact?.action}
                      </span>
                    </span>
                    <p className="ml-11">{interact?.content}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {data?.status !== "closed" && data.assignee && (
          <form
            onSubmit={handleSubmit}
            className="flex w-full gap-3 justify-center items-center my-5"
          >
            <input
              required
              type="text"
              id="message"
              name="message"
              value={message}
              placeholder="Reply to this conversation"
              onChange={(e) => setMessage(e.target.value)}
              className="p-3 w-full border border-slate-400 outline-none rounded-md focus:ring-2 focus:border-blue-200"
            />
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 transition-all duration-200 ease-linear h-full text-xl px-4 py-2.5 text-white rounded-md"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default EditHelpDeskUser;
