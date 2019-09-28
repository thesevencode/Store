'use strict'

module.exports = function (ClientModel) {
  async function createOrUpdate (client) {
    const cond = {
      _id: client._id
    }
    const existingClient = await ClientModel.findOne(cond)

    if (existingClient) {
      const updated = await ClientModel.updateOne(
        cond,
        { $set: client }
      )
      return updated ? ClientModel.findOne(cond) : existingClient
      // modificar
    }

    const result = await ClientModel.create(client)
    return result.toJSON()
  }

  function findById (id) {
    return ClientModel.findById(id)
  }

  function findByAuthorUuid (uuid) {
    return ClientModel.find(
      { authorId: uuid })
  }

  function findByDni(dni) {
    return ClientModel.find({
        dni: dni // options : $all, $nin, $in
    })
}

  function findAll () {
    return ClientModel.find(
      null,
      null,
      { sort: { createdAt: 1 } }// options: -1, 1
    )
  }

  function findByLocation (coordinates, distance) {
    return ClientModel.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: coordinates
          },
          $maxDistance: distance * 1609.34
        }
      }
    })
  }

  function findByTags (tags) {
    return ClientModel.find({
      tags: { $in: tags } // options : $all, $nin, $in
    })
  }

  function findByCalendar (dates) {
    return ClientModel.find({
      calendar: { $elemMatch: { date: { $in: dates } } }
    })
  }

  return {
    createOrUpdate,
    findById,
    findAll,
    findByAuthorUuid,
    findByLocation,
    findByTags,
    findByCalendar,
    findByDni
  }
}