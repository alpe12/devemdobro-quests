import { baseUrl, eventsQuantity } from '../variables.js'

async function getEvents(userName){
    const response = await fetch(baseUrl + userName + '/events?per_page=' + Math.max(100,((isNaN(eventsQuantity) ? 1 : eventsQuantity)*5)));
    //per_page is higher than eventsQuantity because we only want some events types. So I filter it later.
    return await response.json();
}

export { getEvents }