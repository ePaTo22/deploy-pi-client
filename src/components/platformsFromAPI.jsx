import { useSelector } from "react-redux";

export default function PlatformsFromAPI() {
  const platforms = useSelector((state) => state.platforms);

  let arrPlat = platforms.join().split(",");

  let arrPlatforms = arrPlat.map((el) => el.trim());

  function removeDuplicates(e) {
    return e.filter((item, index) => e.indexOf(item) === index);
  }

  let arrPlatFinal = removeDuplicates(arrPlatforms);

  return arrPlatFinal.sort();
}
