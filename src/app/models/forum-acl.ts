import { Role } from "./role";

export class ForumACL {
    id = ''
    read_topic = true;
    write_topic = false;
    edit_topic = false;
    delete_topic = false;
    write_post = true;
    edit_post = false;
    delete_post = false;
    role: Role = new Role();
    role_id = '';
}