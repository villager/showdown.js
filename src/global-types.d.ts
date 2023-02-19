type Client = import ('./client').Client;

type ID = '' | (string & {
    __isID: true;
});
interface AnyObject {
    [k: string]: any
}
type RoomID = "" | "lobby" | "staff" | "upperstaff" | "development" | string & {__isRoomID: true};
