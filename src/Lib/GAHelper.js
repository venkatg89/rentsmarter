import firebase from '@react-native-firebase/app'
import '@react-native-firebase/analytics'

const FBAnalytics = firebase.analytics();
FBAnalytics.setAnalyticsCollectionEnabled(true)


export function sendScreenView(screenName){
    FBAnalytics.logScreenView({
        screen_name: screenName,
        screen_class: screenName
    })
}

//eventName - required
//if there is no eventAction - need to send empty object or empty string
// if there is no eventLabel - optional
// Example : sendEvent('PropertySearch Scenario', 'property Search', 'PropertySearch List')


export function sendEvent(eventName, eventAction, eventLabel = "") {
    let formattedEventName = eventName.replace(/ /g, "_")

    if (formattedEventName.length > 32) {
        console.log("[GAHelper] Event Name [" + eventName + "] length exceeds 32 charactes, truncationg.");
        formattedEventName = formattedEventName.substr(0, 32);
    }

    if (eventAction && typeof eventAction == "string") {

        FBAnalytics.logEvent(formattedEventName, {
            eventAction: eventAction,
            eventLabel: eventLabel
        });
        
    } else if (eventAction && typeof eventAction == "object") {
        FBAnalytics.logEvent(formattedEventName, eventAction);
    }
}