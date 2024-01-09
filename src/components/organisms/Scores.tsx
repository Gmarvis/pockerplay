// import Avatar from "../atoms/Avatar";
import Avatar from "react-avatar";

type Props = {
  homePlayer: User;
  guessPlayer: User;
  score?: Score;
};

export default function Scores(props: Props) {
  return (
    <div className="flex flex-col mobile:max-sm:py-4 py-2 px-4 rounded-[10px] text-white justify-center items-center bg-themecolor">
      <h3 className="font-bold mobile:max-sm:hidden">scores</h3>
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col items-center justify-center">
          {/* <Avatar profilePicture={""} size={3} /> */}
          <Avatar name={props.homePlayer?.username} size="30" round={true} />
          <span>{props.homePlayer?.username?.split(" ")[0] ?? "You"}</span>
        </div>
        <div>
          <p className="flex gap-2 justify-between">
            {props.score?.home_player_score ?? "0"}:
            {props.score?.guess_player_score ?? "0"}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          {/* <Avatar profilePicture={""} size={3} /> */}
          <Avatar name={props.guessPlayer?.username} size="30" round={true} />
          <span> {props.guessPlayer?.username?.split(" ")[0] ?? "Guess"}</span>
        </div>
      </div>
    </div>
  );
}
