const generateForm=document.querySelector(".generate-form");
const imageGallery=document.querySelector(".image-gallery");

const OPEN_API_KEY = "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";
let isImageGenerating = false;

const updateImageCard = (imgDataArray) => {
    imgDataArray.forEach((imgObject,index)=>{
        const imgCard = imageGallery.querySelectorAll(".img-card")[index];
        const imgElement = imgCard.querySelector("img");
        const downloadBtn = imgCard.querySelector(".download-btn");

        //set the image source to the AI
        const aiGeneratedImg =`data:image/jpeg;base64,${imgObject.b64_json}`;
        imgElement.src = aiGeneratedImg;

        //when the image is loaded , remove the loading class
        imgElement.onload = () =>{
            imgCard.classList.remove("loading");
            downloadBtn.setAttribute("href",aiGeneratedImg);
            downloadBtn.setAttribute("download",`${new Date().getTime().jpg}`);
        }
    })
}


const generateAiImage = async (userPrompt,userImgQuantity) =>{
    try{
        //send a request to the openAI API to generate images based on user inputs
        const response = await fetch("https://api.openai.com/v1/images/generations",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPEN_API_KEY}`
            },
            body: JSON.stringify({
                prompt:userPrompt,
                n: parseInt(userImgQuantity),
                size: "512x512",
                response_format: "b64_json"
            })
        });
        if(!response.ok) throw new Error("Failed to generate images! Please try again.");

        const {data}=await response.json(); //get data from the response
        updateImageCard([...data]);
        // console.log(data);
    }catch(error){
        alert(error.message);
    }finally{
        isImageGenerating = false;
    }
}


const handleFormSubmission=(e) =>{
    e.preventDefault();
    if(isImageGenerating) return;
    isImageGenerating = true;

    //get user input and image quantity from the form
    const userPrompt =e.srcElement[0].value;
    const userImgQuantity = e.srcElement[1].value;

    //Creating HTML markup for image cards with loading state
    const imgCardMarkup = Array.from({length: userImgQuantity},()=>
        `<div class="img-card loading">
            <img src="./images/Spinner-1s-200px.gif" alt="">
            <a href="" class="download-btn">
                <img src="./images/downloading.png" alt="download icon">
            </a>
        </div>`
    ).join("");
    
    imageGallery.innerHTML = imgCardMarkup;
    generateAiImage(userPrompt,userImgQuantity);
}


generateForm.addEventListener("submit",handleFormSubmission);