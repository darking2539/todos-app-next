import axios from "axios";

const AxiosFetch = axios.create({});

interface DataParam {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    popupStatus: boolean | null;
    editStatus: boolean | null;
}

export const CallGetDataList = () => {

    var token = localStorage.getItem("token")

    return AxiosFetch({
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        },
        url: `/todo`,
    });
};

export const CallDeleteData = (id: string) => {

    var token = localStorage.getItem("token")
    return AxiosFetch({
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        },
        url: `/todo/${id}`,
    });
};

export const CallAddData = (param: DataParam) => {
    
    var token = localStorage.getItem("token")
    
    return AxiosFetch({
        method: 'POST',
        url: `/todo`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            title: param?.title,
            description: param?.description || "",
        }
    });
};

export const CallEditData = (param: DataParam) => {
    
    var token = localStorage.getItem("token")

    return AxiosFetch({
        method: 'PATCH',
        url: `/todo/${param?.id}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            id: param?.id,
            title: param?.title,
            description: param?.description || "",
            complete: param?.completed,
            popupStatus: false,
            editStatus: false,
        }
    });
};

interface userParam {
    username: string;
    password: string;
}

export const CallLogin = (param: userParam) => {
    return AxiosFetch({
        method: 'POST',
        url: `/auth/login`,
        data: {
            username: param?.username,
            password: param?.password
        }
    });
};

export const CallRegister = (param: userParam) => {
    return AxiosFetch({
        method: 'POST',
        url: `/users`,
        data: {
            username: param?.username,
            password: param?.password,
        }
    });
};

interface changePasswordParam {
    username: string;
    oldPassword: string;
    newPassword: string;
}

export const CallChangePassword = (param: changePasswordParam) => {

    var token = localStorage.getItem("token")

    return AxiosFetch({
        method: 'POST',
        url: `/auth/changepassword`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            username: param?.username,
            oldPassword: param?.oldPassword,
            newPassword: param?.newPassword,
        }
    });
};