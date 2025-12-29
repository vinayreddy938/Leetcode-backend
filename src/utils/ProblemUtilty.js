import axios from "axios";
export const getLanguageByID = (lang) => {
  const languages = {
    "c++": 54,
    python: 71,
    java: 62,
    javascript: 63,
  };

  return languages[lang.toLowerCase()];
};
export const submitBatch = async (submissions) => {
  try {
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
      params: {
        base64_encoded: "true",
      },
      headers: {
        "x-rapidapi-key": "3d6e47163amshf72be4f0376aea2p13c32fjsnfa7471925cc0",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        submissions: submissions,
      },
    };
    const response = await axios.request(options);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const waiting = (ms) => setTimeout(()=>{return 1;},ms);
export const submitToken = async (tokens) => {
  try {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
      params: {
        tokens: tokens.join(","), //[token1,token2,...]
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": "3d6e47163amshf72be4f0376aea2p13c32fjsnfa7471925cc0",
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
    };
    while(true){
    const response = await axios.request(options);
   const isResultObtained =  response.submissions.every(result => result.status.id === 3); // all passed
   if(isResultObtained){
    return response.submissions;
   }
  await waiting(1000);
  }
  } catch (err) {}
};
