export class RemoteMetadata {
    nickname?: string;
    address?: string;
    token?: string;
    port?: number;
    used_space_in_gb?: number;
    remaining_space_in_gb?: number;
    hosted_remaining_space_in_gb?: number;
    hosted_used_space_in_gb?: number;

    constructor(nickname?: string, address?: string, token?: string, port?: number, used_space_in_gb?: number, 
        remaining_space_in_gb?: number, hosted_remaining_space_in_gb?: number, hosted_used_space_in_gb?: number) {
        this.nickname = nickname;
        this.address = address;
        this.token = token;
        this.port = port;
        this.used_space_in_gb = used_space_in_gb;
        this.remaining_space_in_gb = remaining_space_in_gb;
        this.hosted_remaining_space_in_gb = hosted_remaining_space_in_gb;
        this.hosted_used_space_in_gb = hosted_used_space_in_gb;
    }
}