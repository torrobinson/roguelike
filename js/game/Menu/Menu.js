class Menu {
		constructor(pages){
			this.pages = this.init(pages);
			this.game = null; // null reference initially
			this.resetNavStack();
		}

		// Attributes
		currentPage(){
			return this.navStack[0];
		}
		currentOption(){
			return this.currentPage().options[this.selectedOptionIndex];
		}
		getPreviousPageSelectedIndex(){
			if(this.previousSelectedOptionIndexStack.length > 0){
				return this.previousSelectedOptionIndexStack[0];
			}
			else{
				return 0;
			}
		}


		// Helpers
		resetNavStack(){
			this.selectedOptionIndex = 0;
			this.navStack = [this.pages[0]];
			this.previousSelectedOptionIndexStack = [];
		}
		containCursor(){

			if(this.selectedOptionIndex < 0){
				this.selectedOptionIndex = this.currentPage().options.length - 1;
			}
			else if(this.selectedOptionIndex >= this.currentPage().options.length){
				this.selectedOptionIndex = 0;
			}
		}

		// because we define in a JSON format, we can't pass a reference.
		// Initialize the options in the menu by setting their menu refrence
		init(pages){
			var self = this;
			for(var p=0; p<pages.length; p++){
				var page = pages[p];
				for(var o=0; o<page.options.length; o++){
					var option = page.options[o];
						option.menu = self;
				}
			}
			return pages;
		}

		linkToGame(game){
			this.game = game;
		}

		// Option navigation
		navUp(){
			this.selectedOptionIndex--;
			this.containCursor();
		}
		navDown(){
			this.selectedOptionIndex++;
			this.containCursor();
		}
		executeCurrentOption(){
			var option = this.currentOption();
			if(option !== null){
				option.execute();
			}
		}

		// Page navigation
		navToPage(pageId){
			var page = this.pages.filter(function(page){return page.id === pageId})[0];

			this.navStack.unshift(page);
			this.previousSelectedOptionIndexStack.unshift(this.selectedOptionIndex);

			this.selectedOptionIndex = 0;
		}
		goBackAPage(){
			if(this.navStack.length > 1){
				this.selectedOptionIndex = this.getPreviousPageSelectedIndex();

				this.navStack.shift();
				this.previousSelectedOptionIndexStack.shift();
			}
		}
	}