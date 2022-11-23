Webcam.set({
    width : 360,
    height : 300,
    image_format : "png",
    png_quality : 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id= 'captured_image' src= '" + data_uri + "'/>";
    });
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/GFdGJxhs9/model.json", modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded');
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = prediction_1;
    speak_data_2 = prediction_2;

    var utterThis = new SpeechSynthesisUtterance( speak_data_1 + speak_data_2);
    synth.speak(utterThis);
} 
function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        document.getElementById("result_gesture_name2").innerHTML = results[1].label;

        prediction_1 = results[0].label;
        prediction_2 = results[1].label;

        

        if(results[0].label == "Amazing")
        {
            document.getElementById("update_gesture").innerHTML = "&#128076;";
            prediction_1 = "Looks Amazing!" ;
            document.getElementById("result_gesture_name").innerHTML = prediction_1;
        }
        if(results[0].label == "Best")
        {
            document.getElementById("update_gesture").innerHTML = "&#128077;";
            prediction_1 = "All the Best!" ;
            document.getElementById("result_gesture_name").innerHTML = prediction_1;
        }
        if(results[0].label == "Victory")
        {
            document.getElementById("update_gesture").innerHTML = "&#9996;";
            prediction_1 = "That's a marvellous victory!!" ;
            document.getElementById("result_gesture_name").innerHTML = prediction_1;
        }

        if(results[1].label == "Amazing")
        {
            document.getElementById("update_gesture2").innerHTML = "&#128076;";
            prediction_2 = "Looks Amazing" ;
            document.getElementById("result_gesture_name2").innerHTML = prediction_2;
        }
        if(results[1].label == "Best")
        {
            document.getElementById("update_gesture2").innerHTML = "&#128077;";
            prediction_2 = "All the Best!" ;
            document.getElementById("result_gesture_name2").innerHTML = prediction_2;
        }
        if(results[1].label == "Victory")
        {
            document.getElementById("update_gesture2").innerHTML = "&#9996;";
            prediction_2 = "That's a marvellous victory!!" ;
            document.getElementById("result_gesture_name2").innerHTML = prediction_2;
        }
        speak();
    }
}