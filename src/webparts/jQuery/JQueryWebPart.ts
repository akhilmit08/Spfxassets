import { Version } from '@microsoft/sp-core-library';
import MyAccordionTemplate from './MyAccordionTemplate';
import * as jQuery from 'jquery';
import 'jqueryui';
import { SPComponentLoader } from '@microsoft/sp-loader';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneLabel,
  PropertyPaneLink,
  PropertyPaneSlider,
  PropertyPaneToggle,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './JQueryWebPart.module.scss';
import * as strings from 'JQueryWebPartStrings';

export interface IJQueryWebPartProps {
  description1: string;
  name: string;
  Slider: string;
  Toggle: string;
  dropdown: string;
  URL:string;
  checkbox:string;
  textbox:string;
}

export default class JQueryWebPart extends BaseClientSideWebPart<IJQueryWebPartProps> {

  public constructor() {
    super();
  
    SPComponentLoader.loadCss('//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css');
  }
  public render(): void {
    this.domElement.innerHTML = MyAccordionTemplate.templateHtml;
    const accordionOptions: JQueryUI.AccordionOptions = {
      animate: true,
      collapsible: false,
      icons: {
        header: 'ui-icon-circle-arrow-e',
        activeHeader: 'ui-icon-circle-arrow-s'
      }
    };
    jQuery('.accordion', this.domElement).accordion(accordionOptions);
    /*
    this.domElement.innerHTML = `
      <div class="${ styles.jQuery }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Welcome to SharePoint!</span>
              <p class="${ styles.subTitle }">Customize SharePoint experiences using Web Parts.</p>
              <p class="${ styles.description }">Name: ${escape(this.properties.name)}</p>
              <p class="${ styles.description }">Description: ${escape(this.properties.description1)}</p>

              <p class="${ styles.description }">Slider: ${escape(this.properties.Slider)}</p>
              <p class="${ styles.description }">Toggle: ${escape(this.properties.Toggle)}</p>
              <p class="${ styles.description }">dropdowm: ${escape(this.properties.dropdown)}</p>
              <p class="${ styles.description }">checkbox: ${escape(this.properties.checkbox)}</p>

              <p class="${ styles.description }">URL: ${escape(this.properties.URL)}</p>
              <p class="${ styles.description }">textbox: ${escape(this.properties.textbox)}</p>
              <a href="https://aka.ms/spfx" class="${ styles.button }">
                <span class="${ styles.label }">Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>`;
      */
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected textBoxValidationMethod(value: string) : string {
    if(value.length < 10 ) { return "Name should be atleast 10 char!"; }
    else {return "";}
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        { //Page 1
          header: {
            description: "Page 1 – Name and Description"
          },
          groups: [
            {
              groupName: "Group one",
              groupFields: [
                PropertyPaneTextField('name', {
                  label: "Name",
                  multiline: false,
                  resizable: false,
                  onGetErrorMessage: this.textBoxValidationMethod,
                  errorMessage: "This is the error message",
                  deferredValidationTime: 5000,
                  placeholder: "Please enter name","description": "Name property field"
                }),
                PropertyPaneTextField('description1', {
                  label: "Description",
                  multiline: true,
                  resizable: true,
                  placeholder: "Please enter description","description": "Description property field"
                })
              ]
            }
          ]
        },
        { //Page 2
          header: {
            description: "Page 2 – Slider and Dropdown"
          },
          groups: [
            {
              groupName: "Group one",
              groupFields: [
                PropertyPaneSlider('Slider', {
                  label:'Slider',min:1,max:10
                }),
                PropertyPaneToggle('Toggle', {
                label: 'Slider'
                })
              ]
            },
            {
              groupName: "Group Two",
              groupFields: [
                PropertyPaneDropdown('dropdowm', {
                  label:'Drop Down',
                  options: [
                    { key: 'Item1', text: 'Item 1' },
                    { key: 'Item2', text: 'Item 2' },
                    { key: 'Item3', text: 'Item 3' }
                  ]
                }),
                PropertyPaneCheckbox('checkbox',
                  { text: 'Yes/No'})
              ]
            }
          ]
        },
        { //Page 3
          header: {
            description: "Page 3 - URL and Label"
          },
          groups: [
            {
              groupName: "Group One",
              groupFields: [
                PropertyPaneLink('URL',
                { text:"Microsoft", href:'http://www.microsoft.com',target:'_blank'}),
                 PropertyPaneLabel('label',
                { text:'Please enter designation',required:true}),
                 PropertyPaneTextField('textbox',{})
              ]
            }
          ]
        }
      ]
    };
  }
}
