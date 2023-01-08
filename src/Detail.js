// TODO: answer here
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [data, setData] = useState({ card_images: [{ image_url: "" }] });
  const [load, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php?id=" + id)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data[0]);
        setLoading(false);
      });
  }, []);

  if (load) return <h1>Loading...</h1>;
  return (
    <div>
      <Link to="/">
        <button style={{ margin: "24px 32px", padding: "4px 12px" }}>
          back
        </button>
      </Link>

      <div
        style={{
          width: "800px",
          margin: "32px auto 0 auto",
          display: "flex",
        }}
      >
        <img
          role="test-image"
          alt="card"
          className="test-image"
          src={`${data.card_images[0].image_url}`}
          style={{ height: "350px", width: "30%", marginRight: "10px" }}
        />
        <div>
          <h2 className="test-text">{data.name}</h2>
          <h4 className="test-text">Level: {data.level}</h4>
          <h4 className="test-text">{data.attribute}</h4>
          <h4 className="test-text">
            ATK/{data.atk} DEF/{data.def}
          </h4>
          <p className="test-text">{`[ ${data.type} / ${data.race} ]`}</p>
          <p className="test-text">Description: {data.desc}</p>
        </div>
      </div>
      <div
        style={{
          width: "800px",
          margin: "32px auto 0 auto",
        }}
      >
        <div>
          <h3 style={{ textAlign: "center" }}>Card Set</h3>
          <div
            style={{
              marginTop: "24px",
              display: "grid",
              gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
              gap: "16px",
            }}
          >
            {data.card_sets?.map((el, i) => (
              <div key={i} style={{ border: "1px solid black" }}>
                <p className="test-text">Name: {el.set_name}</p>
                <p className="test-text">Code: {el.set_code}</p>
                <p className="test-text">Rarity: {el.set_rarity}</p>
                <p className="test-text">Price: {el.set_price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ); // TODO: replace this
}

export default Detail;
