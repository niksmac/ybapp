'use strict'

jQuery(document).ready(function ($) {
  // var VerEx = require('scripts/verbalexpressions')

  $.fn.api.settings.api = {
	 	'transition': 'pulse',
    'error': {
      'noResults': ''
    }
  }
  var itsThere = 0
  // alert('f')
  var $chatDiv = $('#chat-messageboxs')
  var botBeep = new Audio('assets/beeps/bot.mp3')
  var meBeep = new Audio('assets/beeps/me.mp3')

  initSearchonMessage()

  function messageRow (txt, side) {
    focusMessage()
    $chatDiv.append('<div class="messagebox ' + side + '"> \
    <div class="bubble"> ' + txt + ' </div></div>')
  }

  function focusMessage () {
    $('body, html').animate({
      scrollTop: $(document).height()
    }, 600)
  }

  function showChoice () {
    $('#infoSection').append('<div class="ui grid itsThere"> \
      <div class="ten wide column"><a data-actn="answer" class="ui right pointing label">answer</a></div>\
      <div class="five wide column right aligned"><a data-actn="plus" class="ui black label">+</a></div>\
      </div>')
    initChoiceClick()
    showActionList()
    botBeep.play()
  }

  $('#msgTxt').on('keyup', function () {
    var msg = $('#msgTxt').val()
    if (msg != '') {
      $('#sendMessage i').removeClass('outline')
    } else {
      $('#sendMessage i').addClass('outline')
    }
  })

  $('#chatInput').on('submit', function (e) {
    e.preventDefault()
    var msg = $('#msgTxt').val()
    if (msg != '') {
      messageRow(msg, 'right')
      meBeep.play()
      $('#msgTxt').val('')
      setTimeout(function () {
        messageRow('Yes, ' + msg, 'left')
        botBeep.play()
      }, Math.floor(Math.random() * 1000))
    }
  })

  function initChoiceClick () {
    $('.ui.label').on('click', function () {
      var action = $(this).attr('data-actn')
      switch (action) {
        case 'answer':
          prepareInput()
          break
        case 'plus':
          hideInput()
          showActionList()
          focusMessage()
          break
        default:

      }
    })
  }

  function initActionsClick () {
    $('.labelactions a').on('click', function () {
      let action = $(this).attr('data-clik')
      switch (action) {
        case 'search':
          prepareInput()
          break
        case 'camera':
          $('.ui.modal').modal('show')
          navigator.webkitGetUserMedia({video: true},
          function (stream) {
            document.getElementById('camera').src = URL.createObjectURL(stream)
          },
          function () {
            alert('could not connect stream')
          }
        )
          break
        case 'attach':
          $('#file').trigger('click')
          break
        default:

      }
    })
  }

  function showActionList () {
    if (itsThere === 0) {
      var theList = '<div class="ui equal width grid labelactions"> \
      <a class="column" data-clik="camera"> <i class="material-icons">perm_camera_mic</i> </a> \
      <a class="column" data-clik="attach"> <i class="material-icons">attachment</i> </a> \
      <a class="column" data-clik="attach"> <i class="material-icons">create_new_folder</i> </a> \
      <a class="column" data-clik="attach"> <i class="material-icons">add_location</i> </a> \
      <a class="column" data-clik="attach"> <i class="material-icons">lock_open</i> </a> \
      <a class="column" data-clik="search"> <i class="material-icons">queue</i> </a> \
      </div>'
      $chatDiv.append(theList)
      botBeep.play()
      initActionsClick()
      itsThere = 1
    } else {
      $($('.itsThere').detach()).appendTo('#chat-messageboxs')
    }
  }

  function prepareInput () {
    $('body').addClass('chatsthere')
    $('#chatInput').removeClass('hidden slideOutDown')
    $('#chatInput').addClass('animated slideInUp')
    $('#msgTxt').focus()
  }

  function hideInput () {
    $('body').removeClass('chatsthere')
    $('#chatInput').removeClass('animated slideInUp')
    $('#chatInput').addClass('animated slideOutDown')
  }

  $('.ui.modal').on('click', function () {
    $('.ui.modal').modal('show')
  })

  function openSearch () {
    $('.ui.sidebar').sidebar('setting', 'transition', 'overlay').sidebar('toggle')

    var content = [
      { title: 'Informations' },
      { title: 'Conversations' },
      { title: 'Afghanistan' },
      { title: 'Antigua' },
      { title: 'Anguilla' },
      { title: 'Albania' },
      { title: 'Armenia' },
      { title: 'Netherlands Antilles' },
      { title: 'Angola' },
      { title: 'Argentina' },
      { title: 'American Samoa' },
      { title: 'Austria' },
      { title: 'Australia' },
      { title: 'Aruba' },
      { title: 'Aland Islands' },
      { title: 'Azerbaijan' },
      { title: 'Bosnia' },
      { title: 'Barbados' },
      { title: 'Bangladesh' },
      { title: 'Belgium' },
      { title: 'Burkina Faso' },
      { title: 'Bulgaria' },
      { title: 'Bahrain' },
      { title: 'Burundi' }
    ]

    $('.ui.search').search({
      source: content
    })
  }

  $('.ybt').on('click', function () {
    $('#ybt').remove()
    // welcomeUser()
    setTimeout(function () {
      // messageRow('What can i do for you?', 'left')
      showChoice()
    }, 200)
  })

  function initSearchonMessage () {
    console.log('searching')
    var content = [
      { title: 'Informations' },
      { title: 'Conversations' },
      { title: 'Videos' },
      { title: 'Books' },
      { title: 'Music' },
      { title: 'Shopping' },
      { title: 'Games' }
    ]
    $('.msgTxt').search({source: content})
  }

  function welcomeUser () {
    if (!store.get('name')) {
      console.log('names there')
    }
  }
  function showConversations () {
    var convHtml = '<div class="ui two column grid"> \
  <div class="column"> \
    <div class="ui fluid link card"> \
      <div class="content"> \
        <a class="header">Daniel Louise</a>\
      </div> \
    </div> \
  </div> \
  <div class="column"> \
  <div class="ui link card"> \
    <div class="content"> \
      <div class="header">Cute Dog</div> \
      <div class="meta"> \
        <span class="category">Animals</span> \
      </div> \
      <div class="description"> \
        <p></p> \
      </div> \
    </div> \
  </div> \
  </div> \
  </div>'
    $chatDiv.append(convHtml)
  }
})

// setInterval(function () {
//   messageRow(Lorem.prototype.createText(2, Lorem.TYPE.SENTENCE), 'right')
//   focusMessage()
// }, 2000)
//
// setInterval(function () {
//   messageRow(Lorem.prototype.createText(4, Lorem.TYPE.SENTENCE), 'left')
//   focusMessage()
// }, 3000)
