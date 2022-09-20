'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Songs', [
      {
        userId:3,
        albumId:3,
        title:"New Kind Of You",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1021868528242003968/Speak_Of_The_Bass.mp3",
        previewImage:"https://cdn.discordapp.com/attachments/1017492963720433868/1021868400810672209/129638292_EDM_EP_cover_for_a_track_called___Speak_Of_The_Bass_.png"
      },
      {
        userId:3,
        albumId:3,
        title:"Friends Of The Edge",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1021868527411527730/Friends_Of_The_Edge.mp3",
        previewImage:"https://cdn.discordapp.com/attachments/1017492963720433868/1021868468464787559/Friends_Of_The_Edge.png"
      },
      {
        userId:3,
        albumId:3,
        title:"Miles Of Freedom",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1021868527860326460/Miles_Of_Freedom.mp3",
        previewImage:"https://cdn.discordapp.com/attachments/1017492963720433868/1021868401213313024/MilesOfFreedom.png"
      },
      {
        userId:3,
        albumId:3,
        title:"Speak Of The Bass",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1021868528242003968/Speak_Of_The_Bass.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1021868400810672209/129638292_EDM_EP_cover_for_a_track_called___Speak_Of_The_Bass_.png"
      },
      {
        userId:3,
        albumId:3,
        title:"Found Your Girl",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1021868528816619591/Found_Your_Girl.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1021868404375830689/1798166909_EDM_EP_cover_for_a_track_called___Found_Your_Girl_.png"
      },
      {
        userId:3,
        albumId:3,
        title:"Lose Heart",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1021868529470935090/Lose_Heart.mp3",
        previewImage:"https://cdn.discordapp.com/attachments/1017492963720433868/1021868404023500820/3152701230_EDM_EP_cover_for_a_track_called___Lose_Heart_.png"
      },
      {
        userId:3,
        albumId:3,
        title:"There Goes His Friends",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1021868529798094858/There_Goes_His_Friends.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1021868403566333993/1906971369_EDM_EP_cover_for_a_track_called___There_Goes_His_Friends_.png"
      },
      {
        userId:3,
        albumId:3,
        title:"Good And Feeling",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1021868530192371803/Good_And_Feeling.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1021868402735853599/645203905_EDM_EP_cover_for_a_track_called___Good_And_Feeling_.png"
      },
      {
        userId:3,
        albumId:3,
        title:"Confused And Syndrome",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1021868534768345189/Confused_And_Syndrome.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1021868403167871016/3650075415_EDM_EP_cover_for_a_track_called___Confused_And_Syndrome_.png"
      },
      {
        userId:3,
        albumId:3,
        title:"Beat And Fire",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1021868526568493176/Beat_And_Fire.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1021868402337386628/501278457_EDM_EP_cover_for_a_track_called___Beat_And_Fire_.png"
      },
      {
        userId:3,
        albumId:3,
        title:"Storm And Call",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1021868538308341861/Storm_And_Call.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1021868401955717250/844117328_EDM_EP_cover_for_a_track_called___Storm_And_Call_.png"
      },
      {
        userId:3,
        albumId:3,
        title:"DJ, So Do I",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1021868467944685650/DJ_So_Do_I.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1021868401578225735/1595427523_EDM_EP_cover_for_a_track_called___DJ__So_Do_I_.png"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
