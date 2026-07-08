
let Event =JSON.parse(localStorage.getItem('Event')) || [];
let Event_time =JSON.parse(localStorage.getItem('Event_time')) || [];

let Event_input = document.querySelector('.user-input');
let Event_time_input = document.querySelector('.date-input');

let add_btn = document.querySelector('.add-btn');
add_btn.addEventListener('click', function() {

    let Event_text = Event_input.value.trim();
    let Event_time_text = Event_time_input.value.trim();

    if (Event_text && Event_time_text) {

        Event.push(Event_text);
        Event_time.push(Event_time_text);
        localStorage.setItem('Event', JSON.stringify(Event));
        localStorage.setItem('Event_time', JSON.stringify(Event_time));
        Event_input.value = "";
        Event_time_input.value = "";
        displayEvent();

    }
});

[Event_input, Event_time_input].forEach(input => {
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            add_btn.click();
        }
    });
});

function displayEvent() {
    let Event_list = document.getElementById('event-list');
    Event_list.innerHTML = '<h2>Event List</h2>';

    const currentTime = new Date().getTime(); 

    for (let i = 0; i < Event.length; i++) {

        const targetTime = new Date(Event_time[i]).getTime();
        let diff = targetTime - currentTime;

        if (diff < 0) {
            diff = 0;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        let Event_item = document.createElement('div');
        Event_item.innerHTML = `
            <p>${Event[i]}</p>
            <div class="events-container">
                <div class="event-item">
                    <span class="time-box">${days.toString().padStart(2, '0')}</span><span>days</span>
                </div>
                <div class="event-item">
                    <span class="time-box">${hours.toString().padStart(2, '0')}</span><span>hours</span>  
                </div>
                <div class="event-item">
                    <span class="time-box">${minutes.toString().padStart(2, '0')}</span><span>minutes</span>  
                </div>
                <div class="event-item">
                    <span class="time-box">${seconds.toString().padStart(2, '0')}</span><span>seconds</span>   
                </div>
            </div>
        `;
        let btn = document.createElement('button');
        btn.classList.add('delete-btn');
        
        let trash_can = document.createElement('i');
        trash_can.classList.add('fa-regular', 'fa-trash-can' , 'trash-can');

        btn.addEventListener('click', () => {
           Event.splice(i,1);
           Event_time.splice(i , 1);

           localStorage.setItem('Event', JSON.stringify(Event));
           localStorage.setItem('Event_time', JSON.stringify(Event_time));

           displayEvent();
        });

        btn.appendChild(trash_can);
        Event_item.appendChild(btn);

        Event_list.appendChild(Event_item);
    }
}


setInterval(displayEvent, 1000);