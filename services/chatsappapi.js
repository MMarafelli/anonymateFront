const dataUrl = 'https://data.crawfish92.hasura-app.io/v1/query';
const defaultimgblob = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAB6CAMAAABHh7fWAAAAV1BMVEXp6ekyicju7Oomhccsh8fy7+sfg8bf4+cSgMU2i8nl5+ijwNqyyd3M2OPH1eKIsdVkn8+6zt/V3eRwpdGVuNdXmc2qxNtHkssAfcV9rNN4qNKOtdY9jsmdPwt6AAAEBElEQVRoge2aaZPaMAyGiSwfuUMOQiD//3fWAUop5LAtOzvt8M7szu4HeEaKpMiSD4evvvrqq6+++ur/FAAckkRqJbe/9+Me8lNZdWOs1XfNNasPu+ABjpdYCYZPMaX6Mueh4VxemWIYvQnZeUwTHhJcX8Qn90EX2CahLIdDi2ye+4DHWRg2FJ1YAd/hTR0ADumSq18lxqN3NgxbJv82PPUcbbDp7KdU6ZfdrcXXO3vwyIbKgqzZrbfnDaWxt+8SvpIMTpbkCDH3woYaDbLqjd0lXtCdNVm7/Ooh1CC1dfed7cHlib27J2FHNhtaq7x6Mbugmg3CyWhtdkU02z6xnjrXRLRLeN/FrjSP12dXcoQRCe0cZJPOpPyCytnf1LIiIwIaK4rRuXInRxgTCjkhtSYpQnrxkhBlGk1oEXlDeNQ6zlJ3NCnAdVGhNEpENKU3JaIprem/iyY4/AcjnA8/lteOLeETTXh1QUGp4RFKZ7J+c1Ecjh2BrE+YhDhjA6VVIL0/FOnQB4V7bxYJ4rkrdvY4NrSOFK7OHqdk9U3SNb0wph66nGspI1TRh2q3goYx/ZDrWMe9jFPk6OByVvkYpkBm73KM/cxKTWeULxInT9OrxGZWeCOXvmZ2IO1qmp8H/WDXyoLNep9zaZuxHes9gm/s3jDWBOVoO8+WjQkbRembfF+6bDqdBVq8QN6trz9QNDLQugn4KVqe4KHqi4BLNoBTP7Pcm9Z7qjoG3i0CFMOopo3mk4ooVN/WO2xUAWTRNn0s1E1s7Jq0TsKAP78UAJI6L45aRS2TUBtsSJamy3DTwsfom1WelNG5nDF8VSArVkpSuIMsp3gWfW71NTzTH2LnwR0OkD6Wxqiu5oZzWd2Tn4nW1l2/vyLv/tQPNp7MvgaSlyW3cCsykP1VslF02Tacy7R/rXeILt349b1kangq19IIoG7Ht0+hGKzJl5kDD4p4KObvgUyZnjVspsKLyjLPqvmXM6LCy6nmnD8zWv+h/8vTSiw0UaKzYa8tyqeKrbohzYq81sqPWXvp1XllJ4W9+Uxle12NjAnG9G/9I8RWC4HG3Rq/kKZlMzLtjiElTaxmJYxGlsRZ2YKMRjpOB8ttie3zHxj1vPbant8RdzwrElvbiNp9WLWhrasT/vPqhb2aYVCEI2+MVzhlGrspHFeMPoZI6T9i7WJhgT6k0dNL96eMXkkwwr0EQ2G8QCYtq820UMrhEtroxXJKuhxgqtn9E3GnZSicW3OGD7Ibepzp0/I9yLNrCd7u4e9pGfPh8bDl+wX96fF6F3A0cw/NZd7uiH6/HkTcVFvo4+YfD9OHzqGjt4ed7OVv/db++2FDsR/67QYDnPZ61B/3NghbU2s94+wX3nQ3D88Exh4AAAAASUVORK5CYII='
import loginApi from '../services/loginApi';


import { Alert, AsyncStorage } from 'react-native';
const IMEI = require('react-native-imei');
//import fetch from 'isomorphic-fetch'
// // Fixes isomorphic-fetch
// GLOBAL.self = GLOBAL;
const networkErrorObj = {
    status: 503
}
const dp1 = './images/kingfisher.jpg';
const defaultimg = '61316c53-6640-4d9a-a586-3a9c1892716d';
const bearerToken = "Bearer 6e3bfbf5f7b27daa2812541585886b06215c48c30883031e";

export async function sendOtpUser(phone) {
    // try {
    console.log('Making sendOtpUser query');

    var url = "https://auth.crawfish92.hasura-app.io/v1/providers/mobile/send-otp";

    var requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": bearerToken
        }
    };

    var body = {
        "mobile": phone,
        "country_code": "91"
    };

    requestOptions.body = JSON.stringify(body);
    try {
        let resp = await fetch(url, requestOptions);
        return resp;
    }
    catch (e) {
        console.log("Request Failed: " + e);
        return networkErrorObj;
    }
};


export async function updateUser(mobilenumber, displayname, displaypic, status) {
    console.log('updating User query');

    // If you have the auth token saved in offline storage, obtain it in async componentDidMount
    var authToken = await AsyncStorage.getItem('HASURA_AUTH_TOKEN');
    // And use it in your headers
    var userToken = "Bearer " + authToken
    var requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            //for defective95 "Authorization": "Bearer bd69be047e89fb3ac98e788222ee2a56547be1b35ef14fd3"
            "Authorization": userToken
        }
    };

    var body = {
        "type": "update",
        "args": {
            "table": "users",
            "where": {
                "mobilenumber": {
                    "$eq": mobilenumber
                }
            },
            "$set": {
                "displayname": displayname,
                "status": status,
                "displaypic": displaypic
            }
        }
    };

    requestOptions.body = JSON.stringify(body);

    try {
        let resp = await fetch(dataUrl, requestOptions);
        return resp;
    }
    catch (e) {
        console.log("Request Failed: " + e);
        return networkErrorObj;
    }
}

export async function uploadPicture(dp, user_id) {
    //const image1 = 'https://filestore.crawfish92.hasura-app.io/v1/file/61316c53-6640-4d9a-a586-3a9c1892716d'; 

    var uploadurl = "https://app.crawfish92.hasura-app.io/uploadPicture?user_id=" + user_id;
    // var fetchAction =  require('fetch');
    var fileurl = "https://filestore.crawfish92.hasura-app.io/v1/file/" + user_id;
    //const dp1 = "file:///storage/emulated/0/Android/data/com.chatsapp/files/Pictures/image-efe99812-2f01-4b78-9f96-46ffd02186a1.jpg";
    // console.log('dp', dp1);

    // If you have the auth token saved in offline storage, obtain it in async componentDidMount
    var authToken = await AsyncStorage.getItem('HASURA_AUTH_TOKEN');
    // // And use it in your headers
    var userToken = "Bearer " + authToken
    var dp = dp;
    var requestOptions = {
        method: 'PUT',
        headers: {
            // "Accept": 'application/json',
            "Authorization": userToken
        },
        body: dp
    }

    try {
        let resp = await fetch(fileurl, requestOptions);
        console.log(resp);
        return resp.json();
    }
    catch (e) {
        console.log("Request Failed: " + e);
        return networkErrorObj;
    }

}

export async function getPicture(file_id) {
    var url = "https://filestore.crawfish92.hasura-app.io/v1/file/" + file_id;
    // If you have the auth token saved in offline storage, obtain it in async componentDidMount
    var authToken = await AsyncStorage.getItem('HASURA_AUTH_TOKEN');
    // // And use it in your headers
    var userToken = "Bearer " + authToken

    var requestOptions = {
        "method": "GET",
        "headers": {
            "Authorization": userToken
        }
    };

    try {
        let resp = await fetch(url, requestOptions);
        console.log(resp);
        let img = '';
        let imgresp = resp._bodyText;
        if (imgresp.startsWith('data')) {
            img = imgresp;
        } else {
            img = defaultimgblob;
        }
        return img;
    }
    catch (e) {
        console.log("Request Failed: " + e);
        return networkErrorObj;
    }
}


export async function getContacts(user_id) {
    console.log('Making data query (get contacts)');
    // If you have the auth token saved in offline storage, obtain it in async componentDidMount
    var authToken = await AsyncStorage.getItem('HASURA_AUTH_TOKEN');
    // And use it in your headers
    var userToken = "Bearer " + authToken
    var requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": userToken
        }
    };

    var body = {
        "type": "select",
        "args": {
            "table": "users",
            "columns": [
                "*"
            ],
            "where": {
                "user_id": {
                    "$ne": user_id
                }
            }
        }
    };

    requestOptions.body = JSON.stringify(body);
    console.log(requestOptions);

    try {
        let resp = await fetch(dataUrl, requestOptions);
        console.log(resp);
        return resp.json();
    }
    catch (e) {
        console.log("Request Failed: " + e);
        return networkErrorObj;
    }
};


export async function updateRecdTime(user_id, friend_id) {
    var msgurl = "https://app.crawfish92.hasura-app.io/updateRecdTime?user_id='" + user_id + "'&friend_id='" + friend_id + "'";
    try {
        let lastmsgresponse = await fetch(msgurl);
        console.log('lastmsgresponse', lastmsgresponse);
        return lastmsgresponse.json();
    }
    catch (e) {
        console.log("Request Failed: " + e);
        return networkErrorObj;
    }
}

export async function getLastMessages(userId) {
    // to do tem que passar o id do cara da cv que quer pegar
    console.log('getLastMessages')
    var msgurl = "/users/" + userId + "/conversations";
    console.log(msgurl)
    try {
        let lastmsgresponse = await loginApi.get(msgurl, { headers: { logged_user: userId } });
        console.log('lastmsgresponse', lastmsgresponse);
        return lastmsgresponse.json();
    }
    catch (e) {
        console.log("Request Failed: " + e);
        return networkErrorObj;
    }
}

export async function getUnreadMessages(user_id, friend_id) {
    var unreadmsgurl = "https://app.crawfish92.hasura-app.io/getUnreadMessages?user_id='" + user_id + "'&friend_id='" + friend_id + "'";
    let response = await fetch(unreadmsgurl);
    try {
        let response = await fetch(unreadmsgurl);
        console.log(response);
        return response.json();
    }
    catch (e) {
        console.log("Request Failed: " + e);
        return networkErrorObj;
    }
}

export async function getAllMessages(user_id, friend_id) {
    var msgurl = "https://app.crawfish92.hasura-app.io/getAllMessages?user_id=" + user_id + "&friend_id=" + friend_id;
    try {
        let allmsgresponse = await fetch(msgurl);
        console.log('allmsgresponse', allmsgresponse);
        return allmsgresponse.json();
    }
    catch (e) {
        console.log("Request Failed: " + e);
        return networkErrorObj;
    }
}