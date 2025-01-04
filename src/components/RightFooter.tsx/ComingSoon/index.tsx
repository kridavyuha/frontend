import { useMantineTheme } from "@mantine/core";
import { DollarSign, Rss, FileText } from "react-feather";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";
const ComingSoonItem = tw.div`
  bg-gray-100
  mt-1
  h-16
  rounded-sm
  text-lg
  border
  border-solid
  border-transparent
  cursor-pointer transition-all
  flex justify-center items-center hover:border-gray-300 font-bold font-mono
`;

function ComingSoonIndex() {
  const navigate = useNavigate();
  const mantineTheme = useMantineTheme();
  return (
    <div
      className="w-full"
      style={{ color: mantineTheme.colors[mantineTheme.primaryColor][6] }}
    >
      <b style={{ marginLeft: "5px", color: "black" }}>Coming Soon</b>
      <ComingSoonItem
        onClick={() => {
          navigate("/auction-table");
        }}
      >
        <DollarSign size={18} strokeWidth={3} className="mr-3 " />
        Auction Table
      </ComingSoonItem>
      <ComingSoonItem
        onClick={() => {
          navigate("/live-scores");
        }}
      >
        <Rss size={18} strokeWidth={3} className="mr-3 " />
        Live Scores
      </ComingSoonItem>
      <ComingSoonItem
        onClick={() => {
          navigate("/news");
        }}
      >
        <FileText size={18} strokeWidth={3} className="mr-3 " />
        News Articles
      </ComingSoonItem>
    </div>
  );
}

export default ComingSoonIndex;