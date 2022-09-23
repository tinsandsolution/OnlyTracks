'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Songs', [

      {
        userId:4,
        albumId:4,
        title:"A Lazy Farmer Boy",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1022537531021070436/A_Lazy_Farmer_Boy_by_Buster_Carter_And_Preston_Young.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1022538810099245146/4181285393_An_EP_for_a_fiddle_based_song_called__A_Lazy_Farmer_Boy_.png",
        description:"Buster Carter And Preston Young",
      },

      {
        userId:4,
        albumId:4,
        title:"Ragtime Annie",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1022537536389791846/Ragtime_Annie.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1022538813173674075/3342738377_An_EP_for_a_fiddle_based_song_called__Ragtime_Annie_.png",
        description:"Charlie Poole and The North Carolina Ramblers Group",
      },

      {
        userId:4,
        albumId:4,
        title:"Sail Away Lady",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1022537536062628001/Sail_Away_Lady_by_Uncle_Bunt_Stephens.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1022538812771016714/3110125580_An_EP_for_a_fiddle_based_song_called__Sail_Away_Lady_.png",
        description:"'Uncle Bunt' Stephens",
      },

      {
        userId:4,
        albumId:4,
        title:"The Wild Wagoner",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1022537534099701851/The_Wild_Wagoner_by_Jilson_Setters.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1022538812318023730/1988916633_An_EP_for_a_fiddle_based_song_called__The_Wild_Wagoner_.png",
        description:"Jilson Setters",
      },

      {
        userId:4,
        albumId:4,
        title:"Wake Up Jacob",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1022537533067907183/Wake_Up_Jacob_by_Prince_Albert_Hunts_Texas_Ramblers.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1022539369896214629/4072716083_An_EP_for_a_fiddle_based_song_called__Wake_Up_Jacob.png",
        description:"Prince Albert Hunt's Texas Ramblers",
      },

      {
        userId:4,
        albumId:4,
        title:"Don't Go 'Way Nobody",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1022537532627484733/Dont_Go_Way_Nobody.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1022538811856666684/1165379672_An_EP_for_a_fiddle_based_song_called__Don_t_Go__Way_Nobody_.png",
        description:"George Lewis & His New Orleans Stompers",
      },

      {
        userId:4,
        albumId:4,
        title:"Dry Bones",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1022537532229029898/Dry_Bones_by_Bascom_Lamar_Lunsford.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1022538811265273896/348642149_An_EP_for_a_fiddle_based_song_called__Dry_Bones_.png",
        description:"Bascom Lamar Lunsford",
      },

      {
        userId:4,
        albumId:4,
        title:"Sugar Baby",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1022537531402768455/Sugar_Baby_by_Dock_Boggs.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1022538810854211604/3204442858_An_EP_for_a_fiddle_based_song_called__Sugar_Baby_.png",
        description:"Dock Boggs",
      },

      // Blues
      {
        userId:5,
        albumId:5,
        title:"Pinetop's Blues",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1022540831380471878/Pinetops_Blues.mp3",
        previewImage:"https://cdn.discordapp.com/attachments/1017492963720433868/1022916047369670656/2397460995_A_blues_album_cover_called_Pinetop_s_Blues.png",
        description:"Pine Top Smith",
      },

      {
        userId:5,
        albumId:5,
        title:"One Dime Blues",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1022540831032365176/One_Dime_Blues.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1022916050070806648/4289928592_A_blues_album_cover_called_One_Dime_.png",
        description:"Blind Lemon Jefferson",
      },

      {
        userId:5,
        albumId:5,
        title:"Rolls Royce Papa",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1022540830608724078/Rolls_Royce_Papa.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1022916049617817620/2943860038_A_blues_album_cover_called_Rolls_Royce_Papa.png",
        description:"Virginia Liston",
      },

      {
        userId:5,
        albumId:5,
        title:"Old Dog Blue",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1022540833242759209/Old_Dog_Blue_by_Jim_Jackson.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1022916049257123910/2878462884_A_blues_album_cover_called__Old_Dog_Blue.png",
        description:"Jim Jackson",
      },

      {
        userId:5,
        albumId:5,
        title:"Night Latch Key Blues",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1022540832907210802/Night_Latch_Key_Blues.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1022916048925761677/1134911733_A_blues_album_cover_called_Night_Latch_Key.png",
        description:"Virginia Liston",
      },

      {
        userId:5,
        albumId:5,
        title:"Jump Steady Blues",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1022540832584245359/Jump_Steady_Blues.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1022916048565047307/3276724369_A_blues_album_cover_called_Jump_Steady.png",
        description:"Pine Top Smith",
      },

      {
        userId:5,
        albumId:5,
        title:"I'm Gonna Get Me A Man That's All",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1022540831682478120/Im_Gonna_Get_Me_A_Man_Thats_All.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1022916048162402405/352943657_A_blues_album_cover_called_I_m_Gonna_Get_Me_A_Man.png",
        description:"Virginia Liston",
      },
      {
        userId:5,
        albumId:5,
        title:"Deep Blue Sea Blues",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1022915033447022672/Deep_Blue_Sea_Blues.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1022916047780716595/231649372_A_blues_album_cover_called_Deep_Blue_Sea_.png",
        description:"Clara Smith",
      },
      // 1927
      {
        userId:1,
        albumId:1,
        title:"55",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1022917922101936219/55_By_Beatrice_Dillon.mp3",
        previewImage:"https://cdn.discordapp.com/attachments/1017492963720433868/1022918522977910804/1215287145_A_folk_album_cover_called_55.png",
        description:"Beatrice Dillon",
      },
      {
        userId:1,
        albumId:1,
        title:"Butchers Boy",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1022917919828615248/Butchers_Boy_By_Karen_Gwyer.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1022918524290736209/3420495839_A_folk_album_cover_called_Butcher_s_Boy.png",
        description:"Karen Gwyer",
      },
      {
        userId:1,
        albumId:1,
        title:"Casey Jones",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1022917919497273415/Casey_Jones_By_Karen_Gwyer.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1022918523875504229/309265080_A_folk_album_cover_called_Casey_Jones.png",
        description:"Karen Gwyer",
      },
      {
        userId:1,
        albumId:1,
        title:"Charles Giteau",
        url:"https://cdn.discordapp.com/attachments/1017492963720433868/1022917919191081041/Charles_Giteau_by_Kelly_Harrell.mp3",
        previewImage:"https://media.discordapp.net/attachments/1017492963720433868/1022918523451887666/1823596592_A_folk_album_cover_called_Charles_Giteau.png",
        description:"Kelly Harrell",
      },
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
