
/*
 * Generated 7/15/2025 3:06:13 PM
 * Copyright (C) 2025
 */
module TcHmi {
    export module Controls {
        export module test_framework {
            export class test_frameworkControl extends TcHmi.Controls.System.TcHmiControl {

                /*
                Attribute philosophy
                --------------------
                - Local variables are not set in the class definition, so they have the value 'undefined'.
                - During compilation, the Framework sets the value that is specified in the HTML or in the theme (possibly 'null') via normal setters.
                - Because of the "changed detection" in the setter, the value is only processed once during compilation.
                - Attention: If we have a Server Binding on an Attribute, the setter will be called once with null to initialize and later with the correct value.
                */

                /**
                 * Constructor of the control
                 * @param {JQuery} element Element from HTML (internal, do not use)
                 * @param {JQuery} pcElement precompiled Element (internal, do not use)
                 * @param {TcHmi.Controls.ControlAttributeList} attrs Attributes defined in HTML in a special format (internal, do not use)
                 * @returns {void}
                 */
                constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList) {
                    /** Call base class constructor */
                    super(element, pcElement, attrs);
                }

                protected __elementTemplateRoot!: JQuery;
                protected __boolValue: boolean | undefined;
                protected __ellipseControl: any;
                /**
                  * If raised, the control object exists in control cache and constructor of each inheritation level was called.
                  */
                public __previnit() {
                    // Fetch template root element
                    this.__elementTemplateRoot = this.__element.find('.TcHmi_Controls_test_framework_test_frameworkControl-Template');
                    if (this.__elementTemplateRoot.length === 0) {
                        throw new Error('Invalid Template.html');
                    }
                    // Call __previnit of base class
                    super.__previnit();
                }
                /** 
                 * Is called during control initialize phase after attribute setter have been called based on it's default or initial html dom values. 
                 * @returns {void}
                 */
                public __init() {
                    super.__init();
                }

                /**
                * Is called by the system after the control instance gets part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                public __attach() {
                    super.__attach();

                    //     let state = false;
                    //     setInterval(() => {
                    //  state = !state;
                    //  this.setboolValue(state);
                    //       }, 1000);


                    /**
                     * Initialize everything which is only available while the control is part of the active dom.
                     */
                }

                /**
                * Is called by the system after the control instance is no longer part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                public __detach() {
                    super.__detach();

                    /**
                     * Disable everything which is not needed while the control is not part of the active dom.
                     * No need to listen to events for example!
                     */
                }

                /**
                * Destroy the current control instance. 
                * Will be called automatically if system destroys control!
                */
                public destroy() {
                    /**
                    * While __keepAlive is set to true control must not be destroyed.
                    */
                    if (this.__keepAlive) {
                        return;
                    }

                    super.destroy();

                    /**
                    * Free resources like child controls etc.
                    */
                }

                public setboolValue(value: boolean) {
                    let convertedVal = TcHmi.ValueConverter.toBoolean(value);
                    if (convertedVal === null) {
                        convertedVal = <boolean>this.getAttributeDefaultValueInternal('boolValue');
                    }
                    if (tchmi_equal(convertedVal, this.__boolValue)) {
                        return;
                    }
                    this.__boolValue = convertedVal;
                    this.processBoolValue();

                    TcHmi.EventProvider.raise(this.__id + '.onFunctionResultChanged', ['getboolValue']);

                }
                public getboolValue() {
                    return this.__boolValue;
                }
                protected processBoolValue(): void {
                    const ellipse = this.__elementTemplateRoot.find('.test_Indicator_Ellipse');
                    if (ellipse.length > 0) {
                        const color = this.__boolValue ? '#00FF00' : '#FF0000';

                        const id = ellipse.attr('id');
                        const ellipseControl = TcHmi.Controls.get(id) as TcHmi.Controls.Beckhoff.TcHmiEllipse;

                        if (ellipseControl ) {
                            // Use a proper TcHmi.SolidColorBrush object
                            const brush: TcHmi.SolidColor = {
                                color: color
                            };
                            ellipseControl.setFillColor(brush);
                        } else {
                            console.warn('Ellipse control not found or setFillColor not available');
                        }
                    }
                }



            }
        }
        /**
        * Register Control
        */
        TcHmi.Controls.registerEx('test_frameworkControl', 'TcHmi.Controls.test_framework', TcHmi.Controls.test_framework.test_frameworkControl);
    }
}