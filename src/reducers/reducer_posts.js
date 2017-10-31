import { FETCH_POSTS, FETCH_POST} from "../actions/index"
import _ from 'lodash'

export default function (state = {}, action) {
    switch (action.type) {

        case FETCH_POST:
            // const post = action.payload.data;
            // return newsState = {...state}
            // newState[post.id] = post
            // //console.log(action.payload.data)
            // return newState
            return { ...state, [action.payload.data.id] : action.payload.data }

        case FETCH_POSTS:
            return _.mapKeys(action.payload.data,'id')

        default :
            return state
    }
}