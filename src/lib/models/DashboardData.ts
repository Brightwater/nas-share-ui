export class DashboardData {
    activeTask?: { ts?: string, name?: string, status?: string } | null;
    totalLocalSpaceUsedInGb?: number;
    totalRemoteSpaceUsedInGb?: number;
    remotesStatus?: { remoteName: string; status: string }[];
    nextSyncTime?: { hour: number; minute: number };
    diskSpaceRemaining?: number;
    diskSpaceTotal?: number;
    runtime?: {days: number, hours: number, minutes: number};

    constructor(
        activeTask?: { ts?: string, name?: string, status?: string } | null,
        totalLocalSpaceUsedInGb?: number,
        totalRemoteSpaceUsedInGb?: number,
        remotesStatus?: { remoteName: string; status: string }[],
        nextSyncTime?: { hour: number; minute: number },
        diskSpaceRemaining?: number,
        diskSpaceTotal?: number,
        runtime?: { days: number, hours: number, minutes: number }
    ) {
        this.activeTask = activeTask;
        this.totalLocalSpaceUsedInGb = totalLocalSpaceUsedInGb;
        this.totalRemoteSpaceUsedInGb = totalRemoteSpaceUsedInGb;
        this.remotesStatus = remotesStatus;
        this.nextSyncTime = nextSyncTime;
        this.diskSpaceRemaining = diskSpaceRemaining;
        this.diskSpaceTotal = diskSpaceTotal;
        this.runtime = runtime;
    }

}

export function convertSyncTime(hour?: number, minute?: number) {
    console.log("HOUR")
    console.log(hour)
    console.log(minute)
    if (hour != undefined && minute != undefined) {
        let hourStr: string = hour.toString();
        let minuteStr: string = minute.toString();
        let ampm = "";
        console.log("HOUR")
        if (hour < 12) {
            hourStr = (hour + 12).toString();
            ampm = " AM";
        } else {
            hourStr = (hour - 12).toString();
            ampm = " PM"
        }
        if (hourStr.length < 2) {
            hourStr = "0" + hourStr;
        }

        if (minute.toString().length < 2) {
            minuteStr = "0" + minute;
        }
        return hourStr + ":" + minuteStr + ampm;
    }
    console.log("ERR")
    return null;
    
}