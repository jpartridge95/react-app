import { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [inOut, setInOut] = useState("in");
  const [total, setTotal] = useState(0.0);
  const [data, setData] = useState({});
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setData(() => ({
      title: name,
      income: amount,
      currentTotal: total + amount,
      inOrOut: inOut
    }))
  }, [name, amount, total, inOut])

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(() => e.target.value);
  }

  const handleAmountChange = (e) => {
    e.preventDefault();
    setAmount(() => {
      if (document.getElementById("inOrOut").value === "out") {
        return (parseFloat(e.target.value) * -1)
      } else {
        return parseFloat(e.target.value)
      }
  })}

  const handleInOutChange = (e) => {
    e.preventDefault();
    setInOut(() => e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setTotal((prev) => prev + amount);
     setData(() => (
      {
        title: name,
        income: amount,
        currentTotal: total,
        inOrOut: inOut
      }
    ));
    setDataList((prev) => [...prev, data])
    document.getElementById("inOrOut").value = "";
    document.getElementById("name").value = "";
    document.getElementById("monies").value = null;
  }

  const mappedObjects = dataList.map((dataItem, index) => {
    return <p id={index} style={(dataItem.currentTotal > 0 ? inGreen : inRed)}>ID: {dataItem.title}----Amount: {dataItem.income}----{dataItem.inOrOut}----Total: {dataItem.currentTotal}</p>
  })

  return (
    <div style={mainBody}>
      <h1>Quick Budget Calculator</h1>
      <form id="budgetForm" onSubmit={(e)=>e.preventDefault()} style={formStyle}>
        <label>Is money coming in or going out?</label>
        <select id="inOrOut" onChange={handleInOutChange} style={formWidthSmall}>
          <option> </option>
          <option>in</option>
          <option>out</option>
        </select>
        <label>Give the money {inOut} a name</label>
        <input id="name" onChange={handleNameChange} style={formWidthBig}></input>
        <label>How much {inOut}</label>
        <input id="monies" onChange={handleAmountChange} style={formWidthBig}></input>
      </form>
      <button id="invisibutton" onClick={handleSubmit} style={buttonStyle}>$ubmit</button>
      <div style={scrollBox} >
        {mappedObjects}
      </div>
      <h2>Balance: £{total.toFixed(2)}</h2>
    </div>
  );
}

const buttonStyle = {
  marginTop: "1vh",
  marginBottom: "1vh",
  borderRadius: "6px",
  border: "1px solid #056AD1",
  fontFamily: "Helvetica, sans-serif",
  backgroundColor: "#F7E000",
  color: "#4B4B4B",
  padding: "1vh 1vw",
  fontSize: "1.1rem"
}

const formWidthSmall = {
  width: "3.5vw",
  alignSelf: "center"
}

const formWidthBig = {
  width: "10vw",
  alignSelf: "center"
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
}

const inRed = {
  backgroundColor: "#F7B1B1",
}

const inGreen = {
  backgroundColor: "#BDF7B1"
}

const mainBody = {
  height: "100vh",
  width: "100vw",
  margin: "0 0",
  backgroundColor: "whitesmoke",
  overflow: "auto",
  textAlign: "center"
}

const scrollBox = {
  textAlign: "center",
  height: "50vh",
  width: "40vw",
  padding: "2vw 4vh",
  overflow: "auto",
  borderTop: "0.1rem solid gray" ,
  borderBottom: "0.1rem solid gray",
  marginLeft: "auto",
  marginRight: "auto"
}

export default App;
