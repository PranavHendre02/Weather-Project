
    
        // let response= fetch(" https://render.com/docs/web-services#port-binding")
        // let data=  response.json
        // console.log(data)
       
        
        fetch("https://weather-project-nvzh.onrender.com") 
  .then(response => response.json())
  .then(data => console.log("Weather Data:", data))
  .catch(error => console.error("Error fetching data:", error));

       
   
