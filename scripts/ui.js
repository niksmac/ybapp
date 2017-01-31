'use strict'

jQuery(document).ready(function ($) {
  // alert('f')
  var $chatDiv = $('#chat-messageboxs')
  var botBeep = new Audio('beeps/bot.mp3')
  var meBeep = new Audio('beeps/me.mp3')

  // 1
  messageRow('What can i do for you?', 'left')
  showChoice()

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
      $chatDiv.append('<div class="messagebox"> \
        <div class="ui grid"> \
          <div class="ten wide column"><a data-actn="answer" class="ui right pointing label">answer</a></div>\
          <div class="six wide column right aligned"><a data-actn="plus" class="ui black label">+</a></div>\
        </div> \
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
      jQuery('#file').trigger('click')
    })
  }

  function showActionList () {
    var theList = '<div class="ui basic labels actions"> \
        <a class="ui horizontal label"> Fun </a> \
        <a class="ui horizontal label"> Happy </a> \
        <a class="ui label"> Smart </a> \
        <a class="ui label"> Insane </a> \
        <a class="ui label"> Exciting </a> \
      </div>'
    $chatDiv.append(theList)
    botBeep.play()
  }

  function prepareInput () {
    $('#chatInput').removeClass('hidden slideOutDown')
    $('#chatInput').addClass('animated slideInUp')
    $('#msgTxt').focus()
  }

  function hideInput () {
    $('#chatInput').removeClass('animated slideInUp')
    $('#chatInput').addClass('animated slideOutDown')
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
