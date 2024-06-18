export type District = {
  id: number;
  name: string;
  toggle: boolean;
  emoji?: string; // optional, since not all districts have emojis
};

export type City = {
  districts: District[];
  flag: string;
};

export type Data = {
  berlin: City;
  paris: City;
  budapest: City;
  brussels: City;
  brisbane: City;
  wroclaw: City;
  warszawa: City;
};
