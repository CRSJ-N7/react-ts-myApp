import LocalStorageItem from "../../../utils/LocalStorageItem";

const clanMembers = [
  "Deidara",
  "Itachi",
  "Konan",
  "Hidan",
  "Sasori",
  "Kisame",
  "Kakuzu",
  "Tobi",
  "Zetsu",
];

export const getClanMember = () => {
  const randomIndex = Math.floor(Math.random() * clanMembers.length);
  return clanMembers[randomIndex];
};

export const clanMemberStorage = new LocalStorageItem<null | string>({
  key: "member",
  defaultValue: null,
});

