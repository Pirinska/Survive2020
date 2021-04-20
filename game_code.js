// function that will check if there are the needed values in the dataStorage to display the assistant and the name in the game layout
document.body.onload = dataCheck;

// creating constants that are then used for chanking the content based on the chosen options 
const script = document.getElementById('script')
const optionsButton = document.getElementById('options')
const video1 = document.getElementById('iframe1')
const video2 = document.getElementById('iframe2')
const video3 = document.getElementById('iframe3')
const cardImage = document.getElementById('cardImage')
const cardTitle = document.getElementById('cardTitle')
const cardText = document.getElementById('cardText')
const cardUrl = document.getElementById('cardUrl')
const health = document.getElementById('currentHealth')
const money = document.getElementById('currentMoney')
const place = document.getElementById('currentLocation')
const month = document.getElementById('currentMonth')
const chat = document.getElementById('chat')

//finction for toggling the background for white and dark mode
function mode() {
    var dark_mode = document.body;
    dark_mode.classList.toggle("white-mode");
}

//function that checks if the needed data is in the web storage
function dataCheck() {

    if (localStorage.getItem('name') && localStorage.getItem('assistant')) {
        document.getElementById('personalName').innerHTML = localStorage.getItem('name')
        // if it is stored get chosen option for assitant and display the appropriate graphic
        if (localStorage.getItem('assistant') == "angelica") {
            document.getElementById('assistant').src = "images/angelica_talk.png"
        } else {
            document.getElementById('assistant').src = "images/tom_talk.png"
        }
        //else put on name Unknown and display no picture
    } else {
        document.getElementById('personalName').innerHTML = "Unknown"
    }
}

// keep track of what the user will do
let state = {}

// the initMap function was created by following the documentation of Google
let map;
function initMap() {
    //the focused location is where the game player starts
    const location = { lat: 55.953251, lng: -3.188267 };
    map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 8,
    });
    new google.maps.Marker({
        position: location,
        map,
        title: "Zoom out and find out where is your next journey location. You can walk through the streets. So exciting!",

    });
    // here is a function for adding multiple markers on the map
    newMarker({ lat: 30.581980, lng: 114.268066 });
    newMarker({ lat: -33.635890, lng: 150.285780 });
    newMarker({ lat: 22.396427, lng: 114.109497 });
    newMarker({ lat: -34.603683, lng: -58.381557 });
    newMarker({ lat: -54.801910, lng: -68.302948 });
    newMarker({ lat: -68.302948, lng: 9.669960 });
    newMarker({ lat: 35.517490, lng: -86.580444 });
    newMarker({ lat: 55.755825, lng: 37.617298 });
    newMarker({ lat: 69.355789, lng: 88.189293 });
    newMarker({ lat: 37.983810, lng: 23.727539 });
    newMarker({ lat: 39.134100, lng: 26.517750 });
    newMarker({ lat: 33.893791, lng: 35.501778 });
    newMarker({ lat: 12.565679, lng: 104.990967 });

    function newMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map,

        });
    }
}

//the following gunvtion are constructed with the example of a youtube tutorial that shows a basic level of changing text because of buttons :https://www.youtube.com/watch?v=R1S_NhKkvGA, YouTube Channel: Web Dev Simplified
//  this approach was used as it saves creating a single page for  each journey that the player takes
// the functions and array are then modified 

//start game function
function start() {
    state = {}
    showScript(1)
    initMap()
}


//function to show the script and the buttons
function showScript(index) {

    //checks if the index matches the array id
    const scriptArray = ScriptArrays.find(scriptArray => scriptArray.id === index)

    // main script text
    script.innerText = scriptArray.text

    //remove all options
    while (optionsButton.firstChild) {
        optionsButton.removeChild(optionsButton.firstChild)
    }
    // add options based on id array content
    scriptArray.options.forEach(option => {
        if (showOption(option)) {

            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('option')
            button.addEventListener('click', () => chooseOption(option))
            optionsButton.appendChild(button)

        }
    })

    //connect array  and constants that are taken to display different content
    video1.src = scriptArray.videos1
    video2.src = scriptArray.videos2
    video3.src = scriptArray.videos3
    cardImage.src = scriptArray.cImage
    cardTitle.innerText = scriptArray.title
    cardText.innerText = scriptArray.paragraph
    cardUrl.href = scriptArray.url
    health.innerText = scriptArray.cHealth
    money.innerText = scriptArray.cMoney
    place.innerText = scriptArray.cLocation
    month.innerText = scriptArray.cMonth
    chat.innerText = scriptArray.cChat


}

// function that shows the options based on the required state or null
function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

//function for the choosed option content
function chooseOption(option) {

    const nextTexdId = option.nextText
    state = Object.assign(state, option.setState)
    showScript(nextTexdId)
}


//The array contains 34 ids with unique game sript, options, player statistics, 3 videos and 1 article
//  Each of the sources is selected and embeded carefully so as to fullfill the main objective of the game that is to educate in an adventurous way

const ScriptArrays = [
    {

        id: 1,
        text: 'You just entered a journey that you will never forget. We promise you that the “Survive 2020” game will have the most engaging gameplay that will keep you on the edge of your seat until the end. You will travel the world, jump in journeys that you have never thought of and fearlessly save people you have never met before. What are you waiting for? Just press the “Start” button and choose your adventures.',
        videos1: 'https://www.youtube.com/embed/rokGy0huYEA',
        videos2: 'https://www.youtube.com/embed/vGQQbulRUjY',
        videos3: 'https://www.youtube.com/embed/LHj--WDrVO0',
        cImage: 'images/id1.jpg',
        title: '2020 Events',
        paragraph: 'Yep, these things all happened in the year from hell',
        url: 'https://nypost.com/list/major-2020-events/',
        cHealth: '100%',
        cMoney: '4500 € ',
        cLocation: 'Scotland',
        cMonth: 'December',
        cChat: 'Thank you for choosing me! Let the journey begin...',
        options: [
            {
                text: 'Start',
                setState: { start: true },
                nextText: 2

            }
        ]
    },
    {
        id: 2,
        text: 'The time is December of 2019. You are a recent graduate student that has just finished its “Nursing” course at Edinburgh Napier University, Scotland. You have decided to devote the coming year to broadening your horizons by travelling, reaching new cultures and helping people through volunteering.',
        videos1: 'https://www.youtube.com/embed/mKZkCQiCFHY',
        videos2: 'https://www.youtube.com/embed/zhtg9XgVwuM',
        videos3: 'https://www.youtube.com/embed/MyqhDKNig88',
        cImage: 'images/id2.jpg',
        title: 'Here’s where to travel in 2020',
        paragraph: 'A new year—a new decade—is upon us, and with that comes new goals.',
        url: 'https://www.vogue.com/article/where-to-travel-in-2020',

        cHealth: '100%',
        cMoney: '4500 € ',
        cLocation: 'Scotland',
        cMonth: 'December',
        cChat: 'I will tell you with interesting facts and advise you throughout your journey...',
        options: [
            {
                text: 'Next',
                requiredState: (currentState) => currentState.start,
                setState: { start: false, January: true },
                nextText: 3

            }
        ]

    },
    {
        id: 3,
        text: 'It is the morning of the 31st of December. You are writing your New Year Resolutions in your notebook. You are browsing through the Internet to find out some inspiration on how to start the following year. While surfing the Net, you bump into some articles that announce concerning news. The first one states that Australian Bushfires are spreading beyond five million acres. Ten people have died since September. Tens of thousands of farm animals, mainly sheep, were also killed in the fire on Kangaroo Island. You see all those images and videos on the articles and become speechless of how disastrous impact can make a fire and how emergent is the situation. You continue browsing and see that the World Health Organisation informs that China has confirmed people with viral pneumonia of unknown aetiology (unknown cause) detected in Wuhan City, Hubei Province of China. You find this extremely interesting and you are curious about what is this new disease that spreads in Wuhan. Your first journey knocks on the door. Consider where you want to be and what you want to do throughout January of 2021? What will you choose?  ',

        videos1: 'https://www.youtube.com/embed/QhGd440LeUk',
        videos2: 'https://www.youtube.com/embed/-l28KQ8dJDM',
        videos3: 'https://www.youtube.com/embed/xKPWngYf2Wk',
        cImage: 'images/id3.jpg',
        title: 'Australian bushfires',
        paragraph: 'Yes, Australia has always had bushfires: but 2019 is like nothing we have seen before',
        url: 'https://www.theguardian.com/australia-news/2019/dec/25/factcheck-why-australias-monster-2019-bushfires-are-unprecedented ',

        cHealth: '100%',
        cMoney: '4500 € ',
        cLocation: 'Scotland',
        cMonth: 'December',
        cChat: 'Explore the map, if you cannot decide where you want to go...',
        options: [
            {
                text: 'Volunteer at Australian Bushfires',
                requiredState: (currentState) => currentState.January,
                setState: { January: false, Australia: true },
                nextText: 4

            },
            {
                text: 'Explore China, especially Wuhan ',
                requiredState: (currentState) => currentState.January,
                setState: { January: false, China: true },
                nextText: 5
            }
        ]
    },
    {
        id: 4,
        text: 'You buy a ticket with all money you have, heading directly to Sydney, Australia. The flight continues for 35 hours long, it has three stops but you have no doubt that you could help there and you don’t give up. After reaching Sydney, you take a bus and go directly to Blackheath - a village where the fires have spread and caused a disastrous impact on people’s homes. You find the people you have to work with and they show you where you are going to sleep and when you are going to eat. Your shifts are going to take 12 hours and you need to put a special consume that will enable you to breathe fresh air. When the head firefighter finds out you are a graduate nurse, he offers you a choice. I heard you have a degree in Nursing. Do you prefer helping here in the bushfires or sending you to the hospital? We need help at both places so it’s all your choice.',
        videos1: 'https://www.youtube.com/embed/na9eBzLMhTg',
        videos2: 'https://www.youtube.com/embed/RDWJ_wNQpVI',
        videos3: 'https://www.youtube.com/embed/UpNFjLsg38Q',
        cImage: 'images/id4.jpg',
        title: 'Australia fires worsen as every state hits 40C',
        paragraph: 'The remains of a car that was destroyed by bushfires in Balmoral, New South Wales',
        url: ' https://www.bbc.com/news/world-australia-50938504',

        cHealth: '70%',
        cMoney: '3000 € ',
        cLocation: 'Australia',
        cMonth: 'January',
        cChat: 'Did you know that pproximately 1,400 homes have been destroyed?',
        options: [
            {
                text: 'Hospital',
                requiredState: (currentState) => currentState.Australia,
                setState: { Australia: false, hospital: true },
                nextText: 6
            },
            {
                text: 'Bushfires',
                requiredState: (currentState) => currentState.Australia,
                setState: { Australia: false, bushfires: true },
                nextText: 7
            }
        ]
    },
    {
        id: 5,
        text: 'You are going to China for the first time. You are interested in their culture but also curious about what this strange pneumonia virus is doing to people. You get to Wuhan and find the hospital where the first case was confirmed. Doctors say that they do not need volunteers but you somehow manage to make them agree on letting you observe the patients and their symptoms as you want to write your dissertation on your virus. You take notes on the most common symptoms – tiredness, dry cough and fever. However, in some cases, the virus spreads to patients’ lungs and cause difficulty in breathing, chest pain and even loss of speech or movement. On the 8th of January South Korea announce their first case coming from China. On the next day, China states their first death of the unknown virus – a 61-year-old man who had significant medical conditions and died because of the serious condition of his pneumonia. You have helped many people and learned a lot about the virus and its potential treatment. While being Wuhan, you have travelled a bit and fell in love with their culture, people and cuisine.',
        videos1: 'https://www.youtube.com/embed/IY0P38yrQ_Y',
        videos2: 'https://www.youtube.com/embed/CMtM5mQ9eWo',
        videos3: 'https://www.youtube.com/embed/XU9FVqwO4TM',
        cImage: 'images/id5.jpg',
        title: 'China coronavirus',
        paragraph: 'Lockdown measures rise across Hubei province',
        url: 'https://www.bbc.com/news/world-asia-china-51217455',

        cHealth: '70%',
        cMoney: '2500 € ',
        cLocation: 'China',
        cMonth: 'January',
        cChat: 'Do not forget to watch the videos provided. They will represent you the real-world situation that happened...',
        options: [
            {
                text: 'February Journey',
                requiredState: (currentState) => currentState.China,
                setState: { China: false, february_journey: true },
                nextText: 8
            }
        ]
    },
    {
        id: 6,
        text: 'You are heading to the hospital. You see many people crying and feeling awful. Most of them have lost their homes. You spend the next weeks taking care of children and women that have burns and bruises.',
        videos1: 'https://www.youtube.com/embed/na9eBzLMhTg',
        videos2: 'https://www.youtube.com/embed/RDWJ_wNQpVI',
        videos3: 'https://www.youtube.com/embed/UpNFjLsg38Q',
        cImage: 'images/id5.jpg',
        title: 'China coronavirus',
        paragraph: 'Lockdown measures rise across Hubei province',
        url: 'https://www.bbc.com/news/world-asia-china-51217455',

        cHealth: '70%',
        cMoney: '2000 € ',
        cLocation: 'Australia',
        cMonth: 'January',
        cChat: 'Do not forget to watch the videos provided. They will represent you the real-world situation that happened...',
        options: [
            {
                text: 'February journey',
                requiredState: (currentState) => currentState.hospital,
                setState: { hospital: false, february_journey: true },
                nextText: 8
            }
        ]
    },
    {
        id: 7,
        text: 'The firefighters are giving you orders on how to take care of yourself and not put you and the team in danger. You cannot believe how fast the fires are spreading. The next days you spend are on working day and night to ensure stopping the fire.',
        videos1: 'https://www.youtube.com/embed/na9eBzLMhTg',
        videos2: 'https://www.youtube.com/embed/RDWJ_wNQpVI',
        videos3: 'https://www.youtube.com/embed/UpNFjLsg38Q',
        cImage: 'images/id7.jpg',
        title: 'Australian deadly wildfires',
        paragraph: ' Here is what you need to know',
        url: 'https://edition.cnn.com/2020/01/01/australia/australia-fires-explainer-intl-hnk-scli/index.html',

        cHealth: '70%',
        cMoney: '2000 € ',
        cLocation: 'Australia',
        cMonth: 'January',
        cChat: 'Do not forget to watch the videos provided. They will represent you the real-world situation that happened...',
        options: [
            {
                text: 'February journey',
                requiredState: (currentState) => currentState.bushfires,
                setState: { bushfires: false, february_journey: true },
                nextText: 8
            }
        ]
    },
    {
        id: 8,
        text: 'It’s the last week of January and you have learned a lot and grown a lot. You have made many friends and saved many lives. However, you do not feel both mentally and physically well and decide to go on vacation. You quickly search through some inspiring possibilities. While searching on the laptop, your phone buzzes. You look at it and see that one of your closest friends has sent you a message. Vanya: "Can you please help me with the documentation for the pre-settled status? I completely forgot that I need to send my documents! In exchange, I am offering you a 7-days-holiday on the Cruise Ship “Diamond Princess” or a 14-days-expedition to Antarctica. My parents had offered me these two options as a gift for my twenty-first birthday and since Bryan is not available, my next choice is you. What do you think? You choose, it does not matter for me.” Vanya is one of those friends that has never left you whatever you have been going through. However, you are a bit annoyed that she has always left things to the last minute. But her offer of vacation is coming to the right minute as you need a rest but you also do not have the money to go anywhere as you have volunteered all month and the money you have will get you only back to Edinburgh.',
        videos1: 'https://www.youtube.com/embed/HmHSuGGFIWA',
        videos2: 'https://www.youtube.com/embed/JjAR2Vw0N_M',
        videos3: 'https://www.youtube.com/embed/_3tR5uHMlL0',
        cImage: 'images/id8.jfif',
        title: ' Travel to Antarctica',
        paragraph: 'Exploring one of the world’s ultimate wildlife habitats',
        url: 'https://www.worldwildlife.org/magazine/issues/fall-2015/articles/travel-to-antarctica',

        cHealth: '100%',
        cMoney: '4500 € ',
        cLocation: 'Choose',
        cMonth: 'January',
        cChat: 'Exploring the world is so fullfilling. Right?',
        options: [
            {
                text: 'Cruise Ship',
                requiredState: (currentState) => currentState.february_journey,
                setState: { february_journey: false, cruise_ship: true },
                nextText: 9
            },
            {
                text: 'Antarctica expedition',
                requiredState: (currentState) => currentState.february_journey,
                setState: { february_journey: false, antarctica: true },
                nextText: 10
            }
        ]
    },
    {
        id: 9,
        text: 'You and Vanya agreed on meeting on the 28th of January in Hong Kong where the ship will have a stop for new passengers. The flight was again exhausting. Vanya convince you to visit some interesting monuments like the Po Lin Monastery and the Garden of Stars. You are amazed by their culture and beautiful nature. However, the time of getting on board is coming and you head to the cruise ship. Many people are getting on the board. You are amazed at how luxurious and maleficent is the shop looking on the outside. There is a guide that takes you and the whole new group getting on the ship to the main halls. You see the restaurant, the entertainment rooms, the ballroom and the outdoor space. The guide tells you more information about the ship and you cannot believe how you got there. This is Japan’s top cruise ship which amazes you and Vanya. Both of you spent the next couple of days meeting new people, relaxing and having fun. Unfortunately, on the 3rd of February, your last day before leaving the ship, the captain and the crew display an emergency message on the TV screens in each room. “Good morning, my fellow passenger. I and the crew are going to tell you something that should not concern you but you need to take it seriously and follow our orders. On the 1st of February we a passenger from “Diamond Princess” had disembarked the ship on our stop in Hong Kong. Unfortunately, this person has been tested positive for the new COVID-19 virus that started spreading out of China. We are going to quarantine all passengers and crew on board for the safety of the nation. Wait in your rooms until a board member comes and tell you in details what to do. Thank you for your time and do not panic. Everything is under control.” Immediately after the message finishes, Vanya gets a panic attack. You explain your experience and how this virus affects mostly old people. She is feeling better and give you an idea of helping as a nurse on the ship. You know that the least you could do so you tell Vanya to be brave and head out to find the medicine crew. The next couple of days went by testing people and the number of infected got bigger and bigger. The approximate number of passengers was around 3 700 and by the 19th of February, a total number of 712 people have confirmed cases of COVID-19. Passengers with negative tests disembarked and by the end of the month, all passengers and crew members left the ship. Your journey finished on Subaru Island where you had a 14 days’ quarantine as all members of the crew.',
        videos1: 'https://www.youtube.com/embed/72__Mdioty8',
        videos2: 'https://www.youtube.com/embed/CDjM834YWrs',
        videos3: 'https://www.youtube.com/embed/SHXw66RVkwM',
        cImage: 'images/id9.jpg',
        title: 'What the cruise-ship outbreaks reveal about COVID-19',
        paragraph: ' Passengers are quarantined on the cruise ship Diamond Princess',
        url: 'https://www.nature.com/articles/d41586-020-00885-w',

        cHealth: '65%',
        cMoney: '1500 € ',
        cLocation: 'China',
        cMonth: 'February',
        cChat: ' Diamond princess is the best international ship in Japan',
        options: [
            {
                text: 'March Journey',
                requiredState: (currentState) => currentState.cruise_ship,
                setState: { cruise_ship: false, March_journey: true },
                nextText: 11
            }
        ]
    },
    {
        id: 10,
        text: 'Excellent choice! Vanya sends you a link with detailed information on the expedition. You see that the expedition starts in Buenos Aires and then you fly to Ushuaia also known as “the end of the world”. You are super excited and immediately buy a ticket. You agree to meet with Vanya in Buenos Aires and have a day to explore this beautiful capital city. On the 2nd of February, you are on the ship with Vanya crossing the Drake Passage and waiting to see wandering albatross or rare species of dolphins. Both of you prepare for the journey as none of you has experience in an expedition. Anyway, the DSLR camera is taken and you are ready to create memories that will never be forgotten. The next day is filled with various activities like hiking at penguin colonies, photographing wildlife and learning interesting facts for the continent from the experts that have devoted their lives to this place. The most interesting thing is that this day is marked as the hottest day in the last five years – 18.3C. You learn a lot about how dangerous is the glaciers melting connected to sea level rise and open your mind to the upcoming issues that society will face because of this.At the end of the expedition, you feel spiritually enriched. You have balanced your mental and physical health and you are ready to help people again. Antarctica is something that you will never forget and always recall when there are hard moments of your life. The memories of the journey will always remember you how beautiful is life and that there is always something you should fight for.',
        videos1: 'https://www.youtube.com/embed/F2sepCUnENg',
        videos2: 'https://www.youtube.com/embed/KLwqFDml8QQ',
        videos3: 'https://www.youtube.com/embed/mms2tTXLWZk',
        cImage: 'images/id10.jpg',
        title: 'Antarctica logs highest temperature on record of 18.3C',
        paragraph: ' The Antarctic Peninsula is among the fastest-warming regions on earth',
        url: ' https://www.bbc.com/news/world-51420681',

        cHealth: '65%',
        cMoney: '1500 € ',
        cLocation: 'Antarctica',
        cMonth: 'February',
        cChat: 'Antarctica is the fifth largest continent and 99% of it is covered by ice...',
        options: [
            {
                text: 'March Journey',
                requiredState: (currentState) => currentState.antarctica,
                setState: { antarctica: false, March_journey: true },
                nextText: 11
            }
        ]
    },
    {
        id: 11,
        text: 'Now you should decide where to go next. It is only the end of February and you have already learned and seen so much. But what is the next step? There are two options.  The first one is finding a job in the USA because you have always wanted to live there for some months and the other is going to Italy where the situation with the virus is really bad and they need nurses emergently.',
        videos1: 'https://www.youtube.com/embed/98H5AN_vfOY',
        videos2: 'https://www.youtube.com/embed/DQzYnxN3tE4',
        videos3: 'https://www.youtube.com/embed/H_JjhDvePV8" ',
        cImage: 'images/id11.jpg',
        title: ' Kenya suffers worst locust infestation in 70 years as millions of insects swarm farmland',
        paragraph: ' A farmer looks back as she walks through swarms of desert locusts feeding on her crops in Katitika village',
        url: ' https://www.theguardian.com/world/2020/jan/26/kenya-suffers-worst-locust-infestation-in-70-years-as-millions-of-insects-swarm-farmland',

        cHealth: '80%',
        cMoney: '2500 € ',
        cLocation: 'Choose',
        cMonth: 'February',
        cChat: 'Where do you want to go more? It is  your decision...',
        options: [
            {
                text: 'Italy',
                requiredState: (currentState) => currentState.March_journey,
                setState: { March_journey: false, italy: true },
                nextText: 12
            },
            {
                text: 'USA',
                requiredState: (currentState) => currentState.March_journey,
                setState: { March_journey: false, usa: true },
                nextText: 14
            }
        ]
    },
    {
        id: 12,
        text: ' Great! It is really good that you want to help people! You are going to work in the hospital of Bergamo, which is the hardest-hit hospital in Italy. You are going un the hearth of the Covid-19 crisis. Watch the video to see the current situation and prepare mentally for what is waiting for you there. You see how bad is the situation there. Immediately after stepping into the hospital, the head nurse called Alice notices you and asks what she can help you with. You tell her your story and that you want to work there as a nurse and help as many people as you can. She is extremely happy and grateful. Alice makes a brief overview of the building, your room and tells you that you should sign a contract for at least 2 months working there. Do you agree or not? If you do not agree, you will be directed to the flight to USA which was your plan B.',
        videos1: 'https://www.youtube.com/embed/_J60fQr0GWo',
        videos2: 'https://www.youtube.com/embed/eXJhvAtDVwI',
        videos3: 'https://www.youtube.com/embed/H_JjhDvePV8" ',
        cImage: 'images/id12.jpg',
        title: ' Bergamo, Italy',
        paragraph: ' Hardest-hit city in Italy wants you to see how COVID - 19 is affecting its hospitals ',
        url: ' https://news.sky.com/story/coronavirus-they-call-it-the-apocalypse-inside-italys-hardest-hit-hospital-11960597',

        cHealth: '60%',
        cMoney: '1500 € ',
        cLocation: 'Italy',
        cMonth: 'March',
        cChat: 'Two months is not so long. Think of it. They need your help...',
        options: [
            {
                text: 'Agree',
                requiredState: (currentState) => currentState.italy,
                setState: { italy: false, agree: true },
                nextText: 13
            },
            {
                text: 'No not agree',
                requiredState: (currentState) => currentState.italy,
                setState: { italy: false, usa: true },
                nextText: 14
            }
        ]
    },
    {
        id: 13,
        text: ' You start working there on the same day. The shifts are lasting for 12 hours and sometimes more. Many people have a serious illness. Fortunately, you use the learned from your experience with Covid-19 and implement it in the hospital. There are many lives that you save but also you see how many people go through this virus and give up fighting for their lives. Working under pressure is giving you a lot of knowledge and you feel as doing the right thing by contributing to society and helping people fight.',
        videos1: 'https://www.youtube.com/embed/_J60fQr0GWo',
        videos2: 'https://www.youtube.com/embed/eXJhvAtDVwI',
        videos3: 'https://www.youtube.com/embed/H_JjhDvePV8',
        cImage: 'images/id12.jpg',
        title: ' Bergamo, Italy',
        paragraph: ' Hardest-hit city in Italy wants you to see how COVID - 19 is affecting its hospitals ',
        url: ' https://news.sky.com/story/coronavirus-they-call-it-the-apocalypse-inside-italys-hardest-hit-hospital-11960597',

        cHealth: '65%',
        cMoney: '2000 € ',
        cLocation: 'Italy',
        cMonth: 'March',
        cChat: 'Bergamo is known for its rare beauty and medieval atmosphere... ',
        options: [
            {
                text: 'Italy in April',
                requiredState: (currentState) => currentState.agree,
                setState: { agree: false, april_journey_italy: true },
                nextText: 19
            }
        ]
    },
    {
        id: 14,
        text: 'Good, so you are now searching for a job in the USA. You find a job as a nurse at a hospital in Nashville, Tennessee. You sent your CV and candidate for the visa. After a week your position and visa are approved. You buy tickets and quickly pack your clothes. You reach Nashville on the 1st of March. Then, you find your accommodation and get ready for the first shift that will start in the early morning. On the next day, you head to the hospital but before entering you see something in the sky. At the same time, you hear people screaming and running from something. They are screaming “Hide into the building! Hurry up! A tornado is coming!”. Yes, a tornado. What you will do?',
        videos1: 'https://www.youtube.com/embed/kyexru3QYY4',
        videos2: 'https://www.youtube.com/embed/301gtq59jGs',
        videos3: 'https://www.youtube.com/embed/kwJSU8sglt8',
        cImage: 'images/id14.jfif',
        title: 'March tornadoes tore through the heart of Middle Tennessee',
        paragraph: 'In just three hours, tornadoes bolted across 175 miles of Middle Tennessee,',
        url: ' https://fox17.com/news/local/remembering-the-deadly-march-tornadoes-that-tore-through-the-heart-of-middle-tennessee-tornado-outbreak-one-year-anniversary-later-march-3rd-tornadoes',

        cHealth: '70%',
        cMoney: '1500 € ',
        cLocation: 'USA',
        cMonth: 'March',
        cChat: ' Good choice! I know that Tennessee has more than 3,800 documented caves...',
        options: [
            {
                text: 'Panic and hide',
                requiredState: (currentState) => currentState.usa,
                setState: { usa: false, tornado: true },
                nextText: 15
            },
            {
                text: 'Help people',
                requiredState: (currentState) => currentState.usa,
                setState: { usa: false, tornado: true },
                nextText: 15
            }
        ]
    },
    {
        id: 15,
        text: ' After 10 minutes all people are at a same place. But the tornado is coming and you do not know anybody and haven’t undergone such kind of disaster so you are not sure if you are going to survive. You start searching for doctors and luckily find the doctor that you had to be an assistant to. Dr Smith is kind and instructs you on how to calm people down and where to tell them to hide. You did not think that your first day will go exactly like that, right? The tornado is gone and people are alive which is the most important thing. After seeing the drone footage video, you cannot believe that you have survived. The tornado has somehow not reached the hospital which saved all your lives. Everyone’s phones start ringing and you remember that you should also tell your family you are okay. For the next couple of weeks, you get the grips with working in the hospital and find new friends. You like the culture of America and see how different is from Europe and the United Kingdom.',
        videos1: 'https://www.youtube.com/embed/kyexru3QYY4',
        videos2: 'https://www.youtube.com/embed/301gtq59jGs',
        videos3: 'https://www.youtube.com/embed/kwJSU8sglt8',
        cImage: 'images/id14.jfif',
        title: 'March tornadoes tore through the heart of Middle Tennessee',
        paragraph: 'In just three hours, tornadoes bolted across 175 miles of Middle Tennessee,',
        url: ' https://fox17.com/news/local/remembering-the-deadly-march-tornadoes-that-tore-through-the-heart-of-middle-tennessee-tornado-outbreak-one-year-anniversary-later-march-3rd-tornadoes',
        cHealth: '73%',
        cMoney: '1500 € ',
        cLocation: 'USA',
        cMonth: 'March',
        cChat: ' You should go to the basement or find a room without windows that is on the lowest floor possible.',
        options: [
            {
                text: 'USA in April',
                requiredState: (currentState) => currentState.tornado,
                setState: { tornado: false, april_journey_usa: true },
                nextText: 16
            }
        ]
    },
    {
        id: 16,
        text: ' It is the middle of April. You are already working for a month in the Nashville hospital and feel super grateful for meeting these people and going to America. You are always checking if the patients have taken their pills and you got a message on the pager from your boss. “Hi, come to my office if you are free. I need to talk with you.” You finish with your patients and go to his room. Dr Flint starts explaining that the hospital is not doing well financially which is the reason why you should be redundant as the other colleagues have more experience and knowledge. How do you react? ',
        videos1: 'https://www.youtube.com/embed/dDKon-GeIu4',
        videos2: 'https://www.youtube.com/embed/TGWNCl0Wdy4',
        videos3: 'https://www.youtube.com/embed/GT8Q-qDqIQk',
        cImage: 'images/id16.jpg',
        title: ' Unemployment rate soars to 14.7%',
        paragraph: 'Record 20.5 million American jobs lost in April.',
        url: ' https://edition.cnn.com/2020/05/08/economy/april-jobs-report-2020-coronavirus/index.html',
        cHealth: '80%',
        cMoney: '500 € ',
        cLocation: 'USA',
        cMonth: 'April',
        cChat: ' This is the highest unemployment rate since the Great Depression',
        options: [
            {
                text: 'Normal reaction, pack your things and go home',
                requiredState: (currentState) => currentState.april_journey_usa,
                setState: { april_journey_usa: false, may_journey_usa: true },
                nextText: 17
            },
            {
                text: 'Start a scandal, it is not fair',
                requiredState: (currentState) => currentState.april_journey_usa,
                setState: { april_journey_usa: false, may_journey_usa: true },
                nextText: 17
            }
        ]
    },
    {
        id: 17,
        text: ' It’s the 25th of May and you are making your lunch. You are still searching for a job. You have been living on your final salary and the money you have saved. You are turning on the TV and find out that a 46-year-old man, was killed in Minnesota while being arrested for allegedly using a counterfeit bill. There was even a video that they were showing off how the man is screaming “I can’t breathe.” This is shocking and you are terrified by what a person can do. You hope that the policeman gets to jail for this inhuman murder.',
        videos1: 'https://www.youtube.com/embed/Ve8S0rGd9-c',
        videos2: 'https://www.youtube.com/embed/TGWNCl0Wdy4',
        videos3: 'https://www.youtube.com/embed/GT8Q-qDqIQk',
        cImage: 'images/id17.jpg',
        title: 'This death led to worldwide protests with massive support. You will learn more if you continue playing...',
        paragraph: ' ',
        url: ' https://en.wikipedia.org/wiki/Killing_of_George_Floyd',

        cHealth: '60%',
        cMoney: '1000 € ',
        cLocation: 'USA',
        cMonth: 'May',
        cChat: 'Thank you for choosing me! Let the journey begin!',
        options: [
            {
                text: 'June Journey',
                requiredState: (currentState) => currentState.may_journey_usa,
                setState: { may_journey_usa: false, june_journey: true },
                nextText: 18
            }

        ]
    },
    {
        id: 18,
        text: ' It is that time of the year when your journey should continue. You need to decide whether you want to explore Russia or return to the UK to see your close friends and relatives.',
        videos1: 'https://www.youtube.com/embed/mORJmK1Ljgk',
        videos2: 'https://www.youtube.com/embed/0kXCPo7c63I',
        videos3: 'https://www.youtube.com/embed/FlG6tbYaA88',
        cImage: 'images/id20.jpg',
        title: ' Why visit Russia?',
        paragraph: ' The marvelous architecture, vast landscape, Slavic spirit and a proud nation are just a drop in the ocean of things Russia is famous for',
        url: 'https://getbybus.com/en/blog/why-visit-russia/',


        cHealth: '78%',
        cMoney: '1500 € ',
        cLocation: 'Choose',
        cMonth: 'June',
        cChat: 'Do you want to continue travelling or want to see your family?',
        options: [
            {
                text: 'Return to the UK',
                requiredState: (currentState) => currentState.june_journey,
                setState: { june_journey: false, uk: true },
                nextText: 21
            },
            {
                text: 'Visit Russia',
                requiredState: (currentState) => currentState.june_journey,
                setState: { june_journey: false, russia: true },
                nextText: 22
            }
        ]
    },
    {
        id: 19,
        text: 'It’s April now and the situation in the hospital is getting better. You decide to celebrate life in the hospital’s common room. You see that on the 18th of April the World Health Organization will broadcast a “Together at home” concert with famous singers. You decide that this will be a special day. You make order food and surprise Dr Smith and other colleagues on the dinner break. They are all super happy and grateful for making them smile and thinking about their mental health. You can play your favourite artist and explore Bergamo in the Google map down below.',
        videos1: 'https://www.youtube.com/embed/nTd5Trp1pbg',
        videos2: 'https://www.youtube.com/embed/nxj4y9c9KiA',
        videos3: 'https://www.youtube.com/embed/32uSO-1zBL4?list=PLPDkqknt-rAjKJn2gjWSUcYcsNHep4wDK',
        cImage: 'images/id19.jpg',
        title: ' Together at Home concert raises $127m for coronavirus relief',
        paragraph: ' Funds from event organised by Lady Gaga will be split between World Health Organisation and charities',
        url: ' https://www.theguardian.com/music/2020/apr/20/one-world-together-at-home-concert-lady-gaga-raises-127m-coronavirus-relief',

        cHealth: '52%',
        cMoney: '4000 € ',
        cLocation: 'Italy',
        cMonth: 'April',
        cChat: ' Did you know that the concert raised almost $128 million in response to the Covid-19 crisis?',
        options: [
            {
                text: 'Continue working',
                requiredState: (currentState) => currentState.april_journey_italy,
                setState: { april_journey_italy: false, may_journey_italy: true },
                nextText: 20
            }
        ]
    },
    {
        id: 20,
        text: 'It’s the early morning of the 19th of May and you are listening to the news. You hear that the world carbon emissions have dropped by 17% because of the isolation due to COVID-19. At least there is something good, right?',
        videos1: 'https://www.youtube.com/embed/XjegHIf7HHo',
        videos2: 'https://www.youtube.com/embed/HVwjs_D_kRI',
        videos3: 'https://www.youtube.com/embed/zWUVS51N2Eg',
        cImage: 'images/id18.jpg',
        title: ' COVID-19 crisis causes 17 percent drop in global carbon emissions',
        paragraph: ' The study published in the journal Nature Climate Change shows that daily emissions decreased by 17%',
        url: ' https://www.sciencedaily.com/releases/2020/05/200519114233.html',
        cHealth: '80%',
        cMoney: '5500 € ',
        cLocation: 'Italy',
        cMonth: 'May',
        cChat: 'Covid-19 has led to big improvement to the environment due to lockdowns.',
        options: [
            {
                text: 'June journey',
                requiredState: (currentState) => currentState.may_journey_italy,
                setState: { may_journey_italy: false, june_journey: true },
                nextText: 18
            }
        ]
    },
    {
        id: 21,
        text: ' Finally, you are at home. You can see all your closest people and tell them what you have gone through in the first part of this year. You take your luggage and go to surprise your family. They are so happy to see you and start preparing a special dinner for you. However, your friends are chatting in a mutual group that they are going to the “Black Lives Matter” protests this night. Are you staying at home at night or go with your friends to support this cause?',
        videos1: 'https://www.youtube.com/embed/4Vl4I0weXPU',
        videos2: 'https://www.youtube.com/embed/dTypsyd3rvs',
        videos3: 'https://www.youtube.com/embed/VSUjz_gs4V4',
        cImage: 'images/id21.jpg',
        title: ' Black Lives Matter in the UK',
        paragraph: 'We are still not being heard',
        url: ' https://www.bbc.com/news/newsbeat-53812576',

        cHealth: '90%',
        cMoney: '2500 € ',
        cLocation: 'Scotland',
        cMonth: 'June',
        cChat: 'Black Lives Matter may be the largest movement that has happened in the United States history...',
        options: [
            {
                text: 'Stay at home',
                requiredState: (currentState) => currentState.uk,
                setState: { uk: false, home: true },
                nextText: 23
            },
            {
                text: 'Go to protests',
                requiredState: (currentState) => currentState.uk,
                setState: { uk: false, protests: true },
                nextText: 24
            }
        ]
    },
    {
        id: 23,
        text: ' You stay at home and spend quality time with your family for the rest of the day.',
        videos1: 'https://www.youtube.com/embed/4Vl4I0weXPU',
        videos2: 'https://www.youtube.com/embed/dTypsyd3rvs',
        videos3: 'https://www.youtube.com/embed/VSUjz_gs4V4',
        cImage: 'images/id21.jpg',
        title: ' Black Lives Matter in the UK',
        paragraph: 'We are still not being heard',
        url: ' https://www.bbc.com/news/newsbeat-53812576',
        cHealth: '90%',
        cMoney: '2500 € ',
        cLocation: 'Scotland',
        cMonth: 'June',
        cChat: 'Take your time and be ready for the next journeys...',
        options: [
            {
                text: 'July news',
                requiredState: (currentState) => currentState.home,
                setState: { home: false, july_journey_uk: true },
                nextText: 25
            }
        ]
    },
    {
        id: 24,
        text: 'You and your friends join the protests. There are many people and you feel part of something big. You are happy that so many people are united to make a difference.',
        videos1: 'https://www.youtube.com/embed/4Vl4I0weXPU',
        videos2: 'https://www.youtube.com/embed/dTypsyd3rvs',
        videos3: 'https://www.youtube.com/embed/VSUjz_gs4V4',
        cImage: 'images/id21.jpg',
        title: ' Black Lives Matter in the UK',
        paragraph: 'We are still not being heard',
        url: ' https://www.bbc.com/news/newsbeat-53812576',
        cHealth: '90%',
        cMoney: '2500 € ',
        cLocation: 'Scotland',
        cMonth: 'June',
        cChat: ' Some articles say that coronavirus has heightened social divises. What do you think?',
        options: [
            {
                text: 'July news',
                requiredState: (currentState) => currentState.protests,
                setState: { protests: false, july_journey_uk: true },
                nextText: 25
            }
        ]
    },
    {
        id: 25,
        text: 'Exciting news!!! BBC News announces that the Oxford vaccine triggers an immune response. More than 1000 people have been involved in the trial and the findings are promising but it is too early to know if it causes enough protection. The vaccine is made from a genetically engineered virus. The findings had some minimal side effects – 17% had a fever and 10% had a headache. The study will continue with its next stage that is going to try the vaccine on 10 000 people from the United Kingdom. Will you volunteer as a patient for the vaccine?',
        videos1: 'https://www.youtube.com/embed/68IWce-Crns',
        videos2: 'https://www.youtube.com/embed/0QROzq6D5jQ',
        videos3: 'https://www.youtube.com/embed/FXCE4GvLl1E',
        cImage: 'images/id25.jpg',
        title: ' Oxford vaccine triggers immune response',
        paragraph: 'A coronavirus vaccine developed by the University of Oxford appears safe and triggers an immune response.',
        url: ' https://www.bbc.com/news/uk-53469839',

        cHealth: '60%',
        cMoney: '3000 € ',
        cLocation: 'Scotland',
        cMonth: 'July',
        cChat: 'This is your choice. Do you think its early for testing the vaccine on people or not?',
        options: [
            {
                text: 'Yes',
                requiredState: (currentState) => currentState.july_journey_uk,
                setState: { july_journey_uk: false, august_journey: true },
                nextText: 26
            },
            {
                text: 'No',
                requiredState: (currentState) => currentState.july_journey_uk,
                setState: { july_journey_uk: false, august_journey: true },
                nextText: 26
            }
        ]
    },
    {
        id: 26,
        text: 'It’s the end of July. You still want to travel the world and meet more cultures. Your next stop depends on you. There are some cheap flights to Lebanon and Greece. Which destination would you choose?',
        videos1: 'https://www.youtube.com/embed/coIXMyWzpAU',
        videos2: 'https://www.youtube.com/embed/XhSFK2o-QWM',
        videos3: 'https://www.youtube.com/embed/0-ogO8tpbtg',
        cImage: 'images/id26.jpg',
        title: ' Fear of second wave in Beijing after-market outbreak',
        paragraph: ' An area of the Chinese capital Beijing has been put under strict lockdown measures after the  first coronavirus cases in more than 50 days.',
        url: 'https://www.bbc.com/news/world-asia-china-53034924',

        cHealth: '90%',
        cMoney: '2240 € ',
        cLocation: 'Choose',
        cMonth: 'July',
        cChat: 'Both Lebanon and Greece are extremely beautiful and exciting places to visit...',
        options: [
            {
                text: 'Lebanon',
                requiredState: (currentState) => currentState.august_journey,
                setState: { august_journey: false, lebanon: true },
                nextText: 27
            },
            {
                text: 'Greece',
                requiredState: (currentState) => currentState.august_journey,
                setState: { august_journey: false, greece: true },
                nextText: 28
            }
        ]
    },
    {
        id: 22,
        text: ' You decided to explore Russia. But what is Russia without your best friend Vanya? Russia is her home country. She will show you everything worth seeing in Moscow and make your stay at their home. You and Vanya take a flight to Moscow, Russia on the first of June. You are amazed by Russian buildings and tell Vanya that she should take you to all monuments in the town. After two days of journeys, while eating dinner, Vanya’s father gets a call. His boss is telling him that there is an emergency and he should quickly pack his luggage and go to the main office. More details he will have when he goes there. Vanya and her mother get scared of what is going on. Vanya’s father is the head office of the Marine Rescue Service. On the next morning, you turn the TV on and see an announcement of President Putin that orders a state of emergency in the Siberian city – Norilsk. 20 000 tons of fuel has been spilt in the Ambarnaya river. Therefore, Vanya understood where her father has been sent to.',
        videos1: 'https://www.youtube.com/embed/pnN2BNrSrXY',
        videos2: 'https://www.youtube.com/embed/SxshtZxaOaU',
        videos3: 'https://www.youtube.com/embed/qfuDZEQjro8',
        cImage: 'images/id22.jpg',
        title: 'Putin declares emergency over 20,000 ton diesel spill',
        paragraph: ' The Siberian city of Norilsk, after 20,000 tons of fuel spilled into a nearby river from a power station ',
        url: ' https://edition.cnn.com/2020/06/03/europe/russia-putin-oil-spill-norilsk-intl/index.html',

        cHealth: '70%',
        cMoney: '2010 € ',
        cLocation: 'Russia',
        cMonth: 'June',
        cChat: 'Did you know that Russia is the biggest country in the world? ',
        options: [
            {
                text: 'What will happen in July?',
                requiredState: (currentState) => currentState.russia,
                setState: { russia: false, putin: true },
                nextText: 29
            }
        ]
    },
    {
        id: 29,
        text: ' It’s already July and you are still in Russia. On the third of July Putin has nearly 78% of votes on a referendum that could keep him in power until 2036. Vanya and her family are really happy because they like their president.',
        videos1: 'https://www.youtube.com/embed/pnN2BNrSrXY',
        videos2: 'https://www.youtube.com/embed/cUgtHm7YEhs',
        videos3: 'https://www.youtube.com/embed/0Wjv4r8sP9s',
        cImage: 'images/id29.jpg',
        title: ' Putin strongly backed in controversial Russian reform vote',
        paragraph: 'Nearly 78% of Russian voters backed constitutional reforms that could keep President Vladimir Putin in power until 2036, election officials say.',
        url: 'https://www.bbc.com/news/world-europe-53255964',

        cHealth: '73%',
        cMoney: '1500 € ',
        cLocation: 'Russia',
        cMonth: 'July',
        cChat: 'Interesting fact that I have heard is that he is super adventurous and has a black belt in judo...',
        options: [
            {
                text: 'Need of change?',
                requiredState: (currentState) => currentState.putin,
                setState: { putin: false, august_journey: true },
                nextText: 26
            }
        ]
    },
    {
        id: 27,
        text: 'Wow, Lebanon. Lebanon is a beautiful country with rich history and cultural diversity. Beirut is the capital and of Lebanon. The city has more than 2 million people population and it’s one of the oldest cities in the world.This country is maleficent, right? You buy a ticket and on the first of August, you find yourself in the heart of Beirut. There are so many monuments you can see and so much to do. You find a friend from the excursion group and start chatting about the culture and their lifestyle. The journey has just started and you are super happy that you take this decision. After a couple of days, on the fourth of August, you and your friends are going to the sea when you hear a strange noise. One of your friends starts creaming “Look, there!” Your eyes stop on a building you were just heading to that had just exploded. As soon as you see it the explosion reaches your car and the windows broke.You understand that something serious has happened. The car is still functioning so you directly head to the hospital. Many people have injuries and you start helping them. The world is a journey and you are grateful that you have survived. You will probably work in Beirut untill the end of September.',
        videos1: 'https://www.youtube.com/embed/yNH4eE3RYUM',
        videos2: 'https://www.youtube.com/embed/l4CA-4k21eA',
        videos3: 'https://www.youtube.com/embed/k51L0MkRO8E',
        cImage: 'images/id27.jpg',
        title: 'Beirut explosion',
        paragraph: 'The blast destroyed the immediate dockside area, creating a crater approximately 140m (460ft) wide, which flooded with seawater',
        url: 'https://www.bbc.com/news/world-middle-east-53668493',

        cHealth: '60%',
        cMoney: '1900 € ',
        cLocation: 'Lebanon',
        cMonth: 'August',
        cChat: ' There were more than 200 people killed',
        options: [
            {
                text: 'October journey',
                requiredState: (currentState) => currentState.lebanon,
                setState: { lebanon: false, october_journey: true },
                nextText: 31
            }
        ]
    },
    {
        id: 28,
        text: 'You have always wanted to visit a country from Southeast Europe. Greece has an approximate population of 10 million people and it is considered the heart of Western civilization, considering democracy, philosophy, science and drama. One of your old friends from university is from Athens and he agrees to walk you around the town.Days after you get to Athens the prime minister orders a full lockdown and an SMS authorization for movement. You feel as you are trapped there but the video conversations with your family and friends are making your mood better.',
        videos1: 'https://www.youtube.com/embed/yNH4eE3RYUM',
        videos2: 'https://www.youtube.com/embed/l4CA-4k21eA',
        videos3: 'https://www.youtube.com/embed/k51L0MkRO8E',
        cImage: 'images/id28.jpg',
        title: 'SMS Required to leave house after Greek lockdown',
        paragraph: 'Text messages and typed or hand-written notes will once more become part of the everyday life in Greece.',
        url: 'https://greekreporter.com/2020/11/05/sms-required-to-leave-house-after-greek-lockdown-how-it-works/',

        cHealth: '80%',
        cMoney: '1500 € ',
        cLocation: 'Greece',
        cMonth: 'August',
        cChat: 'You can go through this, just do not give up...',
        options: [
            {
                text: 'Greece lockdown in September',
                requiredState: (currentState) => currentState.greece,
                setState: { greece: false, refugee_camp: true },
                nextText: 30
            }
        ]
    },
    {
        id: 30,
        text: 'It is September and you are still in Athens. You have found work in a volunteer society that is giving you food and accommodation. On the 9th of September fire destroys the Greek camp “Moria” and leaves 13 000 people without shelter. Early in the morning, you are called to be sent as a nurse volunteer that will help people with injuries. You immediately respond with confirmation and pack the most important things for the travel. When you go there you in what miserable conditions had people been living there. You help people being housed in tents and check if their health condition is fine.',
        videos1: 'https://www.youtube.com/embed/egj0k4e8ZDA',
        videos2: 'https://www.youtube.com/embed/8v-OHi3iGQI',
        videos3: 'https://www.youtube.com/embed/JvugagwgWfI',
        cImage: 'images/id30.jpg',
        title: ' Moria migrants',
        paragraph: 'Fire destroys Greek camp leaving 13,000 without shelter',
        url: ' https://www.bbc.com/news/world-europe-54082201',

        cHealth: '90%',
        cMoney: '1500 € ',
        cLocation: 'Greece',
        cMonth: 'September',
        cChat: 'I admire people like you. Good job, keep doing it...',
        options: [
            {
                text: 'New journey is coming',
                requiredState: (currentState) => currentState.refugee_camp,
                setState: { refugee_camp: false, october_journey: true },
                nextText: 31
            }
        ]
    },
    {
        id: 31,
        text: 'Vietnam is searching for volunteers to help people in the floods. People are staying on the roofs of their home and do not have food. It is all your choice. Are you staying where you are or going to help people in Vietnam?',
        videos1: 'https://www.youtube.com/embed/3M0TmN2TsK4',
        videos2: 'https://www.youtube.com/embed/3m9I4juKUmw',
        videos3: 'https://www.youtube.com/embed/WdWlR66oK74',
        cImage: 'images/id31.jpg',
        title: 'Severe floods in Vietnam',
        paragraph: ' More than 100 dead as Vietnam reels from worst floods in decades',
        url: 'https://edition.cnn.com/2020/10/21/asia/vietnam-floods-weather-intl-hnk/index.html',

        cHealth: '100%',
        cMoney: '900 € ',
        cLocation: 'Choose',
        cMonth: 'October',
        cChat: ' The 2020 floods affected Central Vietnam - Cambodia, Laos...',
        options: [
            {
                text: 'Staying',
                requiredState: (currentState) => currentState.october_journey,
                setState: { october_journey: false, november: true },
                nextText: 32
            },
            {
                text: 'Going',
                requiredState: (currentState) => currentState.october_journey,
                setState: { october_journey: false, november: true },
                nextText: 32
            }
        ]
    },
    {
        id: 32,
        text: 'Almost the end of the year (November) and you realize that you love your job and have grown up for such a short time, travelled so many places and met so many people with different cultures. You get some notifications on the phone. Biden defeats Trump for White House and Slovakia has tested 2/3 of its population and found out that there is only 1% positive ',
        videos1: 'https://www.youtube.com/embed/vJYL4Osyipc',
        videos2: 'https://www.youtube.com/embed/G0vY0Fn5ngQ',
        videos3: 'https://www.youtube.com/embed/y9urBdYhnYo',
        cImage: 'images/id32.jpeg',
        title: 'Biden defeats Trump for White House',
        paragraph: 'Democrat Joe Biden defeated President Donald Trump to become the 46th president of the United States',
        url: 'https://apnews.com/article/joe-biden-wins-white-house-ap-fd58df73aa677acb74fce2a69adb71f9',

        cHealth: '80%',
        cMoney: '2000 € ',
        cLocation: 'Choose',
        cMonth: 'November',
        cChat: ' Do you enjoy your journeys so far?',
        options: [
            {
                text: 'Staying',
                requiredState: (currentState) => currentState.november,
                setState: { november: false, december: true },
                nextText: 33
            }
        ]
    },
    {
        id: 33,
        text: 'After all months of working and volunteering you are exhausted. You plan to go home for Christmas. ',
        videos1: 'https://www.youtube.com/embed/rokGy0huYEA',
        videos2: 'https://www.youtube.com/embed/vGQQbulRUjY',
        videos3: 'https://www.youtube.com/embed/LHj--WDrVO0',
        cImage: 'images/id33.jpg',
        title: ' The UK started vaccinating',
        paragraph: ' More than 130,000 people have been vaccinated in the first week of the UK vaccination programme.',
        url: ' https://www.bbc.com/news/health-55332242',

        cHealth: '100%',
        cMoney: '5000 € ',
        cLocation: 'Scotland',
        cMonth: 'December',
        cChat: 'I hope that you liked my service. It was my honour to assist you in the Survive2020 game',
        options: [
            {
                text: 'Go home',
                requiredState: (currentState) => currentState.december,
                setState: { december: false, final: true },
                nextText: 34
            }

        ]
    },
    {
        id: 34,
        text: 'Congratulations! You survived 2020! What a year, right? 2020 was full of emotions. What did you learn? How would you describe this experience? The purpose of the game was to make you relive 2020 by choosing your adventures. One of the goals was to focus attention on the medical workers and how important is their role in our society. Moreover, by reaching the end of the game you should have broadened your horizons in aspects of culture, lifestyle and education. The world is full of unexplored opportunities and you grasp each one of them with excitement and hope that each day you will become a better version of yourself. ',
        videos1: 'https://www.youtube.com/embed/rokGy0huYEA',
        videos2: 'https://www.youtube.com/embed/vGQQbulRUjY',
        videos3: 'https://www.youtube.com/embed/LHj--WDrVO0',
        cImage: 'images/id1.jpg',
        title: '2020 Events',
        paragraph: ' I hope that you liked my service. It was my honour to assist you in the Survive2020 game',
        url: 'https://nypost.com/list/major-2020-events/',
        options: [
            {
                text: 'Play again',
                requiredState: (currentState) => currentState.final,
                setState: { final: false, start: true },
                nextText: 1
            }
        ]
    }
]

start();