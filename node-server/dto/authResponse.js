export class AuthResponse {
    constructor(id, firstName, lastName, email, imageUrl, token){
        this.id = id,
        this.firstName = firstName,
        this.lastName = lastName,
        this.email = email,
        this.imageUrl = imageUrl,
        this.token = token
    }
}