import { useDispatch, useSelector } from "react-redux";
import { getLocalStorage } from "../tools/tools";
import { useEffect } from "react";
import { authenticatorDetails } from "../features/login/redux/loginSlice";

export function domainName() {
    return window.location.origin;
};
export function AuthenticationCheck({ children }) {
    const dispatch = useDispatch();
    let token = getLocalStorage("token");
    if (!token) {
        localStorage.clear();
        return null;
    }
    const getData = async () => {
        await dispatch(authenticatorDetails({ token: token }));
    };
    useEffect(() => {
        getData();
    }, []);
    let autherizationresponse = useSelector(state => state.loginReducer.autherizationresponse);
    if (autherizationresponse?.status_code == 200) {
        return children
    } else if (autherizationresponse?.status_code != 200
        && autherizationresponse) {
        localStorage.clear();
        return null;
    }
};

const isLocal = true

const apiUrl = isLocal ? "http://localhost:9000/api" : ""

export const apis = {
    Urls: {
        login: apiUrl + "/access/login",
        register: apiUrl + "/access/registeruser",
        authenticator: apiUrl + "/authenticator",
        quezies: apiUrl + "/quizes",
        addquizes: apiUrl + "/quizeadd",
        quizesdata: apiUrl + "/quizesdata",
        quizesanswersdata: apiUrl + "/quizanswer"
    }
};

export const apiCaller = {
    passbody: async (params) => {
        return params.method != "GET" ? { body: JSON.stringify(params.body) } : {}
    },
    callapi: async (params) => {
        const body = await apiCaller.passbody(params);
        let headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append('Content-Type', 'application/json');
        let token = getLocalStorage("token");
        if (token) {
            headers.append("Authorization", "Bearer " + token);
        }
        if (params.method == "GET" && params.headers) {
            Object.keys(params.headers).map(header => {
                headers.append(header, params.headers[header]);
            })
        }
        const response = await fetch(params.url, {
            method: params.method,
            headers: headers,
            ...body
        }).then((response) => response.json())
        return response;
    },
    get: async (params) => {
        params.method = "GET";
        const response = await apiCaller.callapi(params);
        return response;
    },
    post: async (params) => {
        params.method = "POST";
        const response = await apiCaller.callapi(params);
        return response;
    },
    delete: async (params) => {
        params.method = "DELETE";
        const response = await apiCaller.callapi(params);
        return response;
    },
    put: async (params) => {
        params.method = "PUT";
        const response = await apiCaller.callapi(params);
        return response;
    },
}


export const Common = {
    roles: {
        "executive": "Executive",
        "teamlead": "Team Leader",
        "manager": "Manager",
        "superadmin": "Admin",
    },
    departments: {
        "sales": "Sales",
        "support": "Support",
        "service": "Service"
    },
    leadsStatusData: {
        "lead": "Lead",
        "cold": "Cold",
        "hot": "Hot",
        "prospect": "Prospect",
        "dead": "Dead",
        "close": "Close"
    },
    leadsources: {
        "website": "Web site",
        "phone": "Phone number",
        "email": "Email",
        "generate": "Generate",
        "socialmedia": "Social media",
        "reference": "Reference",
        "exhibition": "Exhibition"
    },
    clientsStatusData: {
        "satisfied": "Satisfied",
        "pending": "Pending",
        "active": "Active",
        "passive": "Passive",
        "expired": "Expired",
        "unsatisfied": "Unsatisfied"
    },
    leadtypes: {
        "online": "Online",
        "meeting": "Meeting"
    },
    clienttype: {
        "oem": "OEM",
        "re-salers": "Re-salers",
        "service": "Service"
    },
    packages: {
        "Tenderinfo": "Tender Information",
        "gemregestration": "Gem Regestration",
        "bidding": "Bidding",
        "productlisting": "Product Listing",
        "reseller": "Reseller",
        "oem": "Oem",
        "iso": "Iso",
        "teadmark": "Tread Mark",
        "dsc": "Dsc"
    },
    reportFor: {
        "c2hpdmFzYW5rYXJwcmFiaHU=": "Leads",
        "a3Jpc2huYXByYWJodQ==": "Client"
    },
    reportLead: {
        "leadreport": "Lead report",
        "performancereport": "Performance report"
    },
    reportClient: {
        "clientreport": "Client report"
    },
    clientpackage: {
        "tenderalert": "Tender Alert",
        "bidding": "Bidding",
        "productlisting": "Product Listing",
        "gembid": "Gem Bid",
        "directorder": "Direct order",
        "OEMPanel": "OEM Panel",
        "MSME": "MSME",
        "DSC": "DSC",
        "ISO": "ISO",
        "trademark": "Trademark",
        "NSIC": "NSIC",
        "BIS": "BIS",
    },
    paymentmethods: {
        check: "Check",
        dd: "Demand Draft",
        online: "Online",
        cash: "Cash",
        neft: "NEFT",
        rtgs: "RTGS",
        upi: "UPI"
    },
    ticketstype: {
        "misstender": "Miss Tender",
        "callbook": "Call Book",
        "junktender": "Junk Tender",
        "invoice": "InVoice",
        "freshalert": "Fesh Alert",
        "addproduct": "Add Product",
        "tenderbid": "Tender Bid",
        "livecatelog": "Live Catelog",
        "order": "Order",
        "refind": "Refind",
        "other": "Other"
    },
    emailgerex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    emailservers: {
        serverports: [567, 465],
        types: ["gmail", "OAuth2"],
        servers: [
            "smtp.gmail.com", "smtp.mail.yahoo.com", "smtp.office365.com",
            "smtp.mail.me.com", "smtp.aol.com", "smtp.zoho.com",
            "smtp.yandex.com", "smtp.mail.com", "smtp.gmx.com",
            "smtp.comcast.net", "smtp.mail.att.net", "smtp.verizon.net",
            "smtp.sendgrid.net"
        ]
    },
    graphcolors: {
        hot: "#FF5733",
        cold: "#64FF33",
        close: "#33F9FF",
        lead: "#3346FF",
        prospect: "#FF3361",
        satisfied: "#FF5733",
        pending: "#64FF33",
        active: "#33F9FF",
        passive: "#3346FF",
        expired: "#FF3361",
        unsatisfied: "#5e6ccf"
    },
    rights: {
        taskclient: {
            "executive": ["sales"],
            "manager": ["sales"],
            "teamlead": ["sales"],
            "superadmin": ["sales"]
        },
        user: {
            "superadmin": [
                "sales",
                "support",
                "service"
            ]
        },
        viewleads: {
            "executive": ["sales"],
            "manager": ["sales"],
            "teamlead": ["sales"]
        },
        todoleads: {
            "executive": ["sales", "service", "support"],
            "manager": ["sales", "service", "support"],
            "teamlead": ["sales", "support", "service"]
        },
        importexport: {
            "superadmin": [
                "sales",
                "support",
                "service"
            ],
            "manager": ["sales", "service"]
        },
        importclient: {
            "teamlead": ["support"],
            "manager": ["sales", "service"]
        },
        deletelead: {
            "executive": [
                "sales",
            ],
            "manager": ["sales"]
        },
        addlead: {
            "executive": ["sales"],
            "manager": ["sales"],
            "teamlead": ["sales"]
        },
        changeleadstatus: {
            "executive": ["sales"],
            "manager": ["sales"],
            "teamlead": ["sales"]
        },
        updatelead: {
            "executive": ["sales"],
            "manager": ["sales"],
            "teamlead": ["sales"]
        },
        viewclients: {
            "executive": ["sales", "support"],
            "manager": ["sales", "service", "support"],
            "teamlead": ["sales", "support", "service"]
        },
        changeclientstatus: {
            "executive": ["service", "support"],
            "manager": ["support", "service"],
            "teamlead": ["support", "service"]
        },
        changeclients: {
            "executive": ["service", "support"],
            "manager": ["sales", "service", "support"],
            "teamlead": ["support", "service"]
        },
        deleteclients: {
            "manager": ["service"]
        },
        addclient: {
            "executive": ["service", "support"],
            "manager": ["sales", "service", "support"],
            "teamlead": ["support", "service"]
        },
        closeleads: {
            "executive": ["service", "support"],
            "manager": ["sales", "service", "support"],
            "teamlead": ["support", "service"]
        },
        viewtickets: {
            "executive": ["service", "support"],
            "manager": ["sales", "service", "support"],
            "teamlead": ["support", "service", "sales"]
        },
        editticket: {
            "executive": ["service", "support"],
            "manager": ["sales", "service", "support"],
            "teamlead": ["support"]
        },
        addticket: {
            "executive": ["sales", "service", "support"],
            "manager": ["sales", "service", "support"],
            "teamlead": ["sales", "service", "support"]
        },
        deleteticket: {
            "manager": ["sales", "support"],
            "teamlead": ["support"]
        },
        viewkeywords: {
            "executive": ["support"],
            "manager": ["sales", "support", "service"],
            "teamlead": ["sales", "service", "support"]
        },
        addkeywords: {
            "executive": ["support"],
            "manager": ["sales", "support", "service"],
            "teamlead": ["sales", "service", "support"]
        },
        updatekeyword: {
            "manager": ["sales", "support", "service"]
        },
        deletekeyowrd: {
            "manager": ["support"]
        }
    }
}
export let utilities = {
    letterlowercaseregex: /^[a-zA-Z]+$/,
    gstRegex: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    tokeywordinputtext: "Create :- "
}