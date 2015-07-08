	var logo = Snap.select('#logo');
	var $logo = $('#logo');
	var circles = logo.selectAll('.letter');
	var infoBlock = $('.info-block');
	var opacityBlock = $('.opacity-block');
	var inter = 0;
	var timer = 700;
	var headCP = logo.select('.letter.letter-o').getBBox();
	var headLP = logo.select('.letter-self.letter-o').getBBox();
	console.log(headCP);
	console.log(headLP);
	var recolor = function(el, text, bg, t)
	{
			if(!t)
			{
				t = timer;
			}
			var name = el.node.classList[1];
			var letters = logo.selectAll('.letter-self.'+name)
			letters.forEach(function(letter)
			{
				letter.animate({
					'stroke':text
				}, t, mina.easein)
			})
			el.animate({
				'fill': bg,
				'stroke':'#000'
			}, t, mina.easein)
	}
	var scaleUp = function(el)
	{
		var name = el.node.classList[1];
		var letters = logo.selectAll('.letter-self.'+name)
		var infoBlock = $('.info-block.'+name);
		var blocks = $('.info-block').not(infoBlock);
		// console.log('scaleUp');
		letters.forEach(function(l)
		{
			l.animate({
				// 'transform':'rotate(180deg)'
			}, timer+600, mina.easeinout)
		})
		el.animate({
			// 'transform':'rotate(180deg)'
		}, timer+600, mina.easeinout)

		var other = [];
		circles.forEach(function(c)
		{
			if(c.node.classList[1] != name)
			{
				other.push(c)
			}
		})
		other.forEach(function(o)
		{
			scaleDown(o)
		})
		blocks.velocity({
			'top':'210%'
		}, 800)
		infoBlock.velocity({
			'top':'10%'
		}, 700)
		opacityBlock.velocity({
			'top':0
		}, 700)
	}
	var scaleDown = function(el)
	{
		var name = el.node.classList[1];
		var letters = logo.selectAll('.letter-self.'+name)
		document.getElementById('background-area').setAttribute('style','display:block');
		// letters.forEach(function(l)
		// {
		// 	l.animate({
		// 		'transform':''
		// 	}, timer+600, mina.easeinout)
		// })
		// el.animate({
		// 		'transform':''
		// }, timer+600, mina.easeinout)
	}
	var bindActions = function()
	{
		circles.forEach(function(circle)
		{
			circle.click(function()
			{
				if(circle.node.classList[1] == 'letter-o-two')
				{
					var _url = 'https://www.facebook.com/osseventysix'
					var win = window.open(_url, '_blank');
					win.focus();
				}
				else
				{
					scaleUp(circle)
				}
			})
			circle.mouseover(function()
			{
				recolor(circle,'#000', '#fff');
			});
			circle.mouseout(function()
			{
				recolor(circle,'#fff', '#000');
			});
		});
	}
	circles.forEach(function(circle)
	{
		if(circle.node.classList[1] == 'letter-center')
		{
			setTimeout(recolor, inter*(timer-150), circle, '#46629E', 'transparent', inter*(timer+400));
			setTimeout(bindActions, inter*(timer-150))
		}
		else
		{
			setTimeout(recolor, inter*(timer-150), circle, '#fff', 'transparent', inter*(timer+400));
		}
		inter++;
	})
	var resetState = function()
	{
		circles.forEach(function(c)
		{
			var name = c.node.classList[1];
			var letters = logo.selectAll('.letter-self.'+name)
			c.animate({
				'transform':'scale(1)'
			}, timer+550, mina.backin)
			letters.forEach(function(l)
			{
				l.animate({
					'transform':'scale(1)'
				}, timer+500, mina.backin)
			})
		})
		infoBlock.velocity({
			'top':'-110%'
		}, 1300)
		opacityBlock.velocity({
			'top':'100%'
		}, 700)
	}
	var closeUp = function()
	{
		$('.modal').hide()
		resetState();
		document.getElementById('background-area').setAttribute('style','display:none');
	}
	$(".background-area").bind('click', closeUp)
	$('.close').bind('click', closeUp)