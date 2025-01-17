import { MLeague } from "./MLeague";

export interface MProfile {
  user_id: number;
  user_name: string;
  mail_id: string;
  profile_pic: number;
  rating: number;
  credits: number;
}

export interface MCompleteProfile {
  profile: MProfile;
  leagues: MLeague[];
}

