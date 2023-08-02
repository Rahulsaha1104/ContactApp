
class ContactInfo {
    static infoID = 0
    constructor(PhoneNumber, EmailID){
        this.ID = ContactInfo.infoID++
        this.infoType = PhoneNumber
        this.infoValue = EmailID
    }

    updateContactInfo(parameter, newValue){
        switch (parameter){
            case "PhoneNumber":
                if (typeof(newValue) != 'string'){
                    return "Invalid Type"
                }
                this.PhoneNumber = newValue
                return this
            case "EmailID":
                if (typeof(newValue) != 'string'){
                    return "Invalid Type"
                }
                this.EmailID = newValue
                return this
            default:
                return "Invalid Parameter"
        }
    }

    
}

module.exports = ContactInfo
