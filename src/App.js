import "./App.css";
import { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function App() {
  const [tab, setTab] = useState("talent");
  const [artists, setArtists] = useState([]);
  const [gigs, setGigs] = useState([])
  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  useEffect(() => {
    /*
    let newData = [
      {
        "What is the band/artist name?": "John Doe",
        "Please provide an email below to be contacted through.":
          "abc@gmail.com",
        "Solo act or band?": "Solo Act",
        "Please select all relevant genres.": "Pop, Rock, Country, Soul",
        "How many times has the band/artist played live?": "3-10",
        "Does the artist/band play mostly covers or original music?": "Covers",
        "Please list a few musical influences. ": "Kanye West",
        "How many members are in the band? (if applicable)": "Solo Act",
        "Please provide a cover photo for your artist profile below. ": "",
        "Please link a short video of the band/artist performing or practicing to be featured on the band's/artist's profile.":
          "https://www.youtube.com/watch?v=MBOa-2b4uQQ&ab_channel=Rousseau",
        "Please provide links below to band/artist pages on social media.  (if applicable)":
          "",
        "Please provide links below to the band/artist's published music. (if applicable)":
          "https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x",
        "Select all music venues the band/artist would be willing to perform at. ":
          "House Venue, Fraternity/Sorority Party, Restaurant/Bar, Outside Venue",
        "Are you interested in paid gigs, unpaid gigs, or both?":
          "Paid gigs only",
        "Are you in need of a practice location?": "Yes",
      },
      {
        "What is the band/artist name?": "The Does",
        "Please provide an email below to be contacted through.":
          "abc@gmail.com",
        "Solo act or band?": "Band",
        "Please select all relevant genres.": "Pop, Rock, Country, Soul",
        "How many times has the band/artist played live?": "3-10",
        "Does the artist/band play mostly covers or original music?": "Covers",
        "Please list a few musical influences. ": "Kanye West",
        "How many members are in the band? (if applicable)": "Solo Act",
        "Please provide a cover photo for your artist profile below. ": "",
        "Please link a short video of the band/artist performing or practicing to be featured on the band's/artist's profile.":
          "https://www.youtube.com/watch?v=_QzcrflqDCg&ab_channel=OurVinyl",
        "Please provide links below to band/artist pages on social media.  (if applicable)":
          "",
        "Please provide links below to the band/artist's published music. (if applicable)":
          "https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x",
        "Select all music venues the band/artist would be willing to perform at. ":
          "House Venue, Fraternity/Sorority Party, Restaurant/Bar, Outside Venue",
        "Are you interested in paid gigs, unpaid gigs, or both?":
          "Paid gigs only",
        "Are you in need of a practice location?": "Yes",
      },
    ];
    newData.forEach((art) => {
      art[
        "Please link a short video of the band/artist performing or practicing to be featured on the band's/artist's profile."
      ] =
        art[
          "Please link a short video of the band/artist performing or practicing to be featured on the band's/artist's profile."
        ].split("&")[0];
    });
    
    let venData = [{
      "Email Address": "abc@gmail.com",
      "What is the concert venue type?": "Fraternity\/Sorority House",
      "Please enter a name for the venue to be listed on the venue's profile.":"ABG",
      "Is the venue owner willing to pay artists to perform?":"Yes",
      "Is the venue located outside or inside?":"Outside",
      "Please list the address of the venue. ":"123 Univ Ave CVille, VA",
      "When is venue interested in hosting a concert? (can be general or specific)":"10/11/21 8PM",
      "Please list any equipment that the venue has available for artists to use.":"Speaker and Microphone System",
      "Please select all genres of music that the venue is interested in hosting.":"Pop, Rock, Country, Electronic",
      "Is the venue interested in requiring cover fees / tickets?":"No",
      "Provide any additional information about the venue below.":null
    }]
    setGigs(venData)
    setArtists(newData);
    */
    fetch("https://sheet.best/api/sheets/ff3a20ec-92ff-48a3-9ad6-e7e47f7f1c4a").then(response => response.json())
    .then(data => {
      data.forEach((art) => {
      art[
        "Please link a short video of the band/artist performing or practicing to be featured on the band's/artist's profile."
      ] =
        art[
          "Please link a short video of the band/artist performing or practicing to be featured on the band's/artist's profile."
        ].split("&")[0];
    });
      setArtists(data)
      console.log(data[0]["What is the band/artist name?"])
    })
    
    fetch("https://sheet.best/api/sheets/98b7d8e4-d6de-44f2-b4c4-7fa2541ff4ef").then(response => response.json())
    .then(data => {
      setGigs(data)
    })
    
  }, []);

  return (
    <div className="App">
      <h1>Hoo's Listening?</h1>
      <ToggleButtonGroup
        exclusive
        value={tab}
        onChange={handleChange}
        aria-label="text alignment"
      >
        <ToggleButton value="gigs" aria-label="left aligned">
          <p>Looking for Gigs?</p>
        </ToggleButton>
        <ToggleButton value="talent" aria-label="centered">
          <p>Looking for Talent?</p>
        </ToggleButton>
      </ToggleButtonGroup>
      {tab === "talent" &&
        artists.map((artist) => {
          return (
            <div className="artistBox">
              <h2>{artist["What is the band/artist name?"]}</h2>
              <h3>{artist["Please select all relevant genres."]}</h3>
              <iframe
                width="460"
                height="315"
                title = "Demo"
                src={artist[
                  "Please link a short video of the band/artist performing or practicing to be featured on the band's/artist's profile."
                ].replace("/watch?v=", "/embed/")}
              ></iframe>
              <br/>
              <Button variant="contained" href={'mailto:' + artist["Please provide an email below to be contacted through."]}>
                Contact
              </Button>
              <Accordion
              sx = {{backgroundColor: '#f2dcdc', borderTop: "1px solid black"}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                >
                  More Information
                </AccordionSummary>
                <AccordionDetails sx = {{textAlign: 'left'}}>
                  {Object.entries(artist).map((entry) => {
                    return <>
                      <h4>{entry[0]}</h4>
                      <p>{entry[1]}</p>
                    </>
                  })}
                </AccordionDetails>
              </Accordion>
            </div>
          );
        })}
      {tab === "gigs" && 
        gigs.map((gig) => {
          return <div className="artistBox">
            <h2>{gig["Please enter a name for the venue to be listed on the venue's profile. "]}</h2>
              <h3>{gig["What is the concert venue type?"]}</h3>
              <Button variant="contained" href={`mailto:` + gig["Email Address"]}>
                Contact
              </Button>
              <Accordion
              sx = {{backgroundColor: '#f2dcdc', borderTop: "1px solid black"}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                >
                  More Information
                </AccordionSummary>
                <AccordionDetails sx = {{textAlign: 'left'}}>
                  {Object.entries(gig).map((entry) => {
                    return <>
                      <h4>{entry[0]}</h4>
                      <p>{entry[1]}</p>
                    </>
                  })}
                </AccordionDetails>
              </Accordion>
          </div>
        })
      }
    </div>
  );
}

export default App;
