import { Topic } from "./topic"
import { User } from "./user"

export class Forum{
    uuid = ''
    name = ''
    created = ''
    owner : User = null
    topics: Topic[] = []
    moderators = []
    acls: []
}