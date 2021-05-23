'use strict'


/*
 * 
 *      Encapsulates (mostly) a collection of objects, 
 *      exposed both as a hash and as an array
 *      _map maps hash id to list index
 * 
 *      Note this is a dumb store, it doesn't check any inputs at all.
 *      It also assumes every stored data object is stored like:
 *          DataStore.add(data, 37, {__id:37} )
 * 
*/


module.exports = {

    create: function () {
        return {
            list: [],
            hash: {},
            _map: {},
        }
    },


    add: function (data, id, object) {
        data.list.push(object)
        data.hash[id] = object
        data._map[id] = data.list.length - 1
    },


    remove: function (data, id) {
        // splice out of list
        var index = data._map[id]
        if (index === data.list.length - 1) {
            data.list.pop()
        } else {
            // replace element to be spliced with element from end
            var movedItem = data.list.pop()
            data.list[index] = movedItem
            // watch out, this bit breaks encapsulation by assuming object's contents
            // alternative would be to look through map for movedID's index
            var movedID = movedItem.__id || movedItem[0].__id
            data._map[movedID] = index
        }
        // finish
        delete data.hash[id]
        delete data._map[id]
    },


}


