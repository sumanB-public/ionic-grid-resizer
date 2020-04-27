import { Directive, ElementRef, HostListener, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[resizable]'
})
export class ResizableGridDirective implements OnInit {
  startX: number;
  startColSize: number;
  startNextColSize: number;
  startColWidth: number;
  totalColSize: number;
  column: any;
  nextCol: any; 

  constructor(private el: ElementRef, public renderer: Renderer2) { } 

  ngOnInit() {
    this.appendDragSpan(); 
  }

  appendDragSpan() {
    // console.log(this.el.nativeElement);  
    let rows: any[] = this.el.nativeElement.children;    
    for(let i=0; i < rows.length; i++) {
       let row = rows[i];
       let cols = row.children;
       for(let j=0; j < cols.length; j++) {
         let col = cols[j];         
         this.renderer.appendChild(col, this.createDragSpan());
         // this.setInitialSize(col); 
       }
    }
  }

  setInitialSize(col) {
    let row = col.parentElement; 
    const startColWidth = col.offsetWidth;
    const startColSize =  col.getAttribute('size') || Math.ceil(this.startColWidth/(row.offsetWidth/12));
    this.renderer.setAttribute(col,'size', startColSize.toString());
  }

  createDragSpan() {
    const span = this.renderer.createElement('span');    
    span.addEventListener('dragstart', this.initResizableColumns.bind(this));
    this.renderer.addClass(span, "ui-column-resizer");    
    return span;
  }

  initResizableColumns(event) {
      //console.log('Drag start');
      this.startNextColSize = 0;      
      this.startX = event.x;    
      this.column = event.target.parentElement; 
      let row = this.column.parentElement; 
      this.startColWidth = this.column.offsetWidth;
      this.startColSize =  parseInt(this.column.getAttribute('size')) || Math.ceil(this.startColWidth/(row.offsetWidth/12));
       //console.log('Column ID ' + column.id);               
      
      this.nextCol = this.column.nextSibling;   
      if(this.nextCol) {
        this.startNextColSize = parseInt(this.nextCol.getAttribute('size')) || Math.ceil(this.nextCol.offsetWidth/(row.offsetWidth/12));
        this.totalColSize = this.startColSize + this.startNextColSize; 
      }          
       
      this.renderer.listen('body', 'drag', (event) => {           
      
        // console.log(' Drag Col ' + this.column.id + ' next col ' + this.nextCol.id); 
        
         if (event.x > 0) {
           let currentWidth = this.startColWidth + (event.x - this.startX);   
           
           if(currentWidth > 0) {
           let currentColSize = Math.ceil(currentWidth/(this.startColWidth/this.startColSize));
           if(currentColSize > 0) {
           let sizeDiff = currentColSize - this.startColSize; 
           if (this.nextCol) {   
             //console.log('sizeDiff ' + sizeDiff);            
              let currentNextColSize = this.totalColSize - currentColSize;
              //console.log('Total Size ' + (currentNextColSize + currentColSize) + " Actual " + this.totalColSize);
              
              if (currentNextColSize > 0 && currentNextColSize <= 12 && currentColSize > 0 && currentColSize <= 12 
                && ((currentNextColSize + currentColSize) === this.totalColSize)) {  
                this.renderer.setAttribute(this.nextCol,'size', currentNextColSize.toString()); 
                this.renderer.setAttribute(this.column,'size', currentColSize.toString());
              }
            } else {
              if (currentColSize > 0 && currentColSize <= this.startColSize) {                
                this.renderer.setAttribute(this.column,'size', currentColSize.toString());
              }
            }
           }
           }
           } 
       
           
           /** $(this.start).parent().css({'min-width': width, 'max-   width': width});
           let index = $(this.start).parent().index() + 1;
           $('.glowTableBody tr td:nth-child(' + index + ')').css({'min-width': width, 'max-width': width});**/
        });     

     this.renderer.listen('body', 'dragend', (event) => {   
        this.column = null;
        this.nextCol = null;
        this.totalColSize = null;
       });
           
           
           /** $(this.start).parent().css({'min-width': width, 'max-   width': width});
           let index = $(this.start).parent().index() + 1;
           $('.glowTableBody tr td:nth-child(' + index + ')').css({'min-width': width, 'max-width': width});**/
        }

  /** @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }**/
}