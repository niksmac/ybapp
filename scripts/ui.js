'use strict'

jQuery(document).ready(function ($) {
  // alert('f')
  var $chatDiv = $('#chat-messageboxs')
  var botBeep = new Audio('beeps/bot.mp3')
  var meBeep = new Audio('beeps/me.mp3')

  // 1
  setTimeout(function () {
    messageRow('What can i do for you?', 'left')
    showChoice()
  }, 1500)

  function messageRow (txt, side) {
    focusMessage()
    // setTimeout(function () {
    $chatDiv.append('<div class="messagebox ' + side + '"> \
        <div class="bubble"> ' + txt + ' </div> \
      </div>')
    // }, 1000)
  }

  function focusMessage () {
    $('body, html').animate({
      scrollTop: $(document).height()
    }, 600)
  }

  function showChoice () {
    setTimeout(function () {
      $('#infoSection').append('<div class="ui grid"> \
          <div class="ten wide column"><a data-actn="answer" class="ui right pointing label">answer</a></div>\
          <div class="five wide column right aligned"><a data-actn="plus" class="ui black label">+</a></div>\
        </div>')
      initChoiceClick()
      botBeep.play()
    }, 1000)
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
    $('.ui.actions a').on('click', function () {
      let action = $(this).attr('data-clik')
      switch (action) {
        case 'search':

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
    var theList = '<div class="ui circular labels big actions"> \
        <a class="ui label" data-clik="camera"> <i class="camera retro icon"></i> </a> \
        <a class="ui label" data-clik="attach"> <i class="attach icon"></i> </a> \
        <a class="ui label" data-clik="attach"> <i class="file video outline icon"></i> </a> \
        <a class="ui label" data-clik="attach"> <i class="marker icon"></i> </a> \
        <a class="ui label" data-clik="attach"> <i class="lock icon"></i> </a> \
        <a class="ui label" data-clik="search"> <i class="search icon"></i> </a> \
      </div>'
    $chatDiv.append(theList)
    botBeep.play()
    initActionsClick()
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
