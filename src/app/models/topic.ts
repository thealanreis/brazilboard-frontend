import { Forum } from "./forum"
import { Post } from "./post"
import { User } from "./user"

export class Topic{
    uuid = '';
    name = '';
    owner: User;
    forum : Forum;
    created = '';
    posts? : Post[] = [];
    acl?: any;
}