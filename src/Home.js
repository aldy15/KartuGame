// TODO: answer here
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";

function Home() {
  // TODO: answer here

  const [data, setData] = useState([]);
  const [load, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg&level=4")
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  }, []);

  function sortData(type) {
    // TODO: answer here
    if (type === "name")
      return data.sort((a, b) => a.name.localeCompare(b.name));

    if (type) return data.sort((a, b) => a[type] - b[type]);

    return data;
  }

  if (load) return <h1>Loading...</h1>;

  return (
    <>
      <div
        style={{
          width: "800px",
          margin: "32px auto 0 auto",
        }}
      >
        <select
          name="sort"
          onChange={(e) => setSortBy(e.target.value)}
          style={{ width: "100%" }}
        >
          <option>Sort By</option>
          <option value="name">Name</option>
          <option value="atk">Attack</option>
          <option value="def">Defence</option>
        </select>
      </div>
      <div
        className="test-simple-grid"
        style={{
          width: "900px",
          margin: "32px auto 0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "32px",
        }}
      >
        {sortData(sortBy).map((el) => (
          <Link key={el.id} to={"/card/" + el.id}>
            <div
              className="yugioh-card test-box"
              key={el.id}
              // onClick={() => navigate("/card/" + el.id)}
              style={{ cursor: "pointer" }}
            >
              <img
                alt="card"
                className="test-image"
                src={el.card_images[0].image_url}
                style={{ height: "300px", width: "100%" }}
              />
              <Heading
                as="h2"
                className="test-heading"
                style={{ textAlign: "center", margin: "5px" }}
              >
                {el.name}
              </Heading>
            </div>
          </Link>
        ))}
      </div>
    </>
  ); // TODO: replace this
}

export default Home;
