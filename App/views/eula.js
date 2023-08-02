import React, { Component } from 'react';
import { ActivityIndicator, Platform, Alert, AlertIOS, Image, Button, StyleSheet, ScrollView, View, TouchableHighlight, TextInput, ListView } from 'react-native';
import { Container, Content, Text, StyleProvider } from 'native-base';
import { createStackNavigator } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
import Helper from '../helper';
import PhotoUpload from 'react-native-photo-upload'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class EulaPage extends React.Component<Props> {

    constructor(props) {
        super(props);
    }

    state = {
        loading: false
    };

    goToPage = (page, params) => {
        this.props.navigation.navigate(page, params);
    };

    render() {

        return (

            <KeyboardAwareScrollView style={{backgroundColor: '#fff'}}>

                <ScrollView
                    contentContainerStyle={{ flex: 1, alignItems: 'flex-start', marginTop: 20, backgroundColor: '#fff', justifyContent: 'flex-start', padding: 10}}>
                    <View><Text>Party-Plug
                        Terms of
                        Service</Text></View><View><Text>(If you live in the United States)</Text></View><View><Text>Effective:
                    September 26, 2017</Text></View><View
                    style={{marginTop: 20}}><Text>Welcome!</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>We’ve drafted these
                    Terms of Service (which we call the “Terms”) so you’ll know the rules that govern our relationship
                    with you. Although we have tried our best to strip the legalese from the Terms, there are places
                    where these Terms may still read like a traditional contract. There’s a good reason for that: These
                    Terms do indeed form a legally binding contract between you and Party-Plug. Please read them
                    carefully.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>By using
                    Party-Plug or any of our other products or services
                    that link to these Terms (we refer to these simply as the “Services”), you agree to the Terms. Of
                    course, if you don’t agree with them, then don’t use the Services.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>ARBITRATION
                    NOTICE: THESE TERMS CONTAIN AN ARBITRATION CLAUSE A LITTLE LATER ON. EXCEPT FOR CERTAIN TYPES OF
                    DISPUTES MENTIONED IN THAT ARBITRATION CLAUSE, YOU AND PARTY-PLUG. AGREE THAT DISPUTES BETWEEN US
                    WILL BE RESOLVED BY MANDATORY BINDING ARBITRATION, AND YOU AND PARTY-PLUG WAIVE ANY RIGHT TO
                    PARTICIPATE IN A CLASS-ACTION LAWSUIT OR CLASS-WIDE ARBITRATION.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>1. Who Can
                    Use the Services</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>No one
                    under 13 is allowed to create an account or use the
                    Services. We may offer additional Services with additional terms that may require you to be even
                    older to use them. Please read all terms carefully.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>By using the Services,
                    you state that:</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You can
                    form a binding contract with
                    Party-Plug</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You are not
                    a person who is barred from receiving the Services
                    under the laws of the United States or any other applicable jurisdiction—meaning that you do not
                    appear on the U.S. Treasury Department’s list of Specially Designated Nationals or face any other
                    similar prohibition.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>-
                    You will comply with these Terms and all applicable
                    local, state, national, and international laws, rules, and regulations.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>If
                    you are using the Services on behalf of a business or some other entity, you state that you are
                    authorized to grant all licenses set forth in these Terms and to agree to these Terms on behalf of
                    the business or entity. If you are using the Services on behalf of an entity of the U.S. Government,
                    you agree to the Amendment to Party-Plug. Terms of Service for U.S. Government
                    Users.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>2. Rights We Grant
                    You</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Party-Plug grants
                    you a personal, worldwide, royalty-free, non-assignable, nonexclusive, revocable, and
                    non-sublicensable license to access and use the Services. This license is for the sole purpose of
                    letting you use and enjoy the Services’ benefits in a way that these Terms and our usage policies,
                    such as our Community Guidelines, allow.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Any software that we provide you
                    may automatically download and install upgrades, updates, or other new features. You may be able to
                    adjust these automatic downloads through your device’s settings.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>You may
                    not copy, modify, distribute, sell, or lease any part of our Services, nor may you reverse engineer
                    or attempt to extract the source code of that software, unless laws prohibit these restrictions or
                    you have our written permission to do so.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>3. Rights You Grant
                    Us</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Many of our Services
                    let you create, upload, post, send, receive, and
                    store content. When you do that, you retain whatever ownership rights in that content you had to
                    begin with. But you grant us a license to use that content. How broad that license is depends on
                    which Services you use and the Settings you have selected.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>We call party
                    submissions that are set to be viewable by Everyone as well as content you submit to crowd-sourced
                    Services, including Our Parties, “Public Content.” For all content you submit to the Services other
                    than Public Content, you grant Party-Plug. and our affiliates a worldwide, royalty-free,
                    sublicensable, and transferable license to host, store, use, display, reproduce, modify, adapt,
                    edit, publish, and distribute that content. This license is for the limited purpose of operating,
                    developing, providing, promoting, and improving the Services and researching and developing new
                    ones.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Because Public
                    Content is inherently public and chronicles matters of
                    public interest, the license you grant us for this content is broader. In addition to granting us
                    the rights mentioned in the previous paragraph, you also grant us a perpetual license to create
                    derivative works from, promote, exhibit, broadcast, syndicate, sublicense, publicly perform, and
                    publicly display Public Content in any form and in any and all media or distribution methods (now
                    known or later developed). To the extent it’s necessary, when you appear in, create, upload, post,
                    or send Public Content, you also grant Party-Plug, our affiliates, and our business partners the
                    unrestricted, worldwide, perpetual right and license to use your name, likeness, and voice,
                    including in connection with commercial or sponsored content. This means, among other things, that
                    you will not be entitled to any compensation from Party-Plug, our affiliates, or our business
                    partners if your name, likeness, or voice is conveyed through the Services, either on the Party-Plug
                    application or on one of our business partner’s platforms.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>While we’re not
                    required to do so, we may access, review, screen, and delete your content at any time and for any
                    reason, including to provide and develop the Services or if we think your content violates these
                    Terms. You alone, though, remain responsible for the content you create, upload, post, send, or
                    store through the Service.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>The Services may contain advertisements. In
                    consideration for Party-Plug. letting you access and use the Services, you agree that we, our
                    affiliates, and our third-party partners may place advertising on the Services. Because the Services
                    contain content that you and other users provide us, advertising may sometimes appear near your
                    content.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>We always love
                    to hear from our users. But if you volunteer
                    feedback or suggestions, just know that we can use your ideas without compensating
                    you.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>4. The Content of
                    Others</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Much of the
                    content
                    on our Services is produced by users, publishers, and other third parties. Whether that content is
                    posted publicly or sent privately, the content is the sole responsibility of the person or
                    organization that submitted it. Although Party-Plug. reserves the right to review or remove all
                    content that appears on the Services, we do not necessarily review all of it. We cannot—and do
                    not—take responsibility for any content that others provide through the
                    Services.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Through these
                    Terms and our Community Guidelines, we make clear
                    that we do not want the Services put to bad uses. But because we do not review all content, we
                    cannot guarantee that content on the Services will always conform to our Terms or Guidelines.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>5.
                    Privacy</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Your privacy
                    matters to us. You can learn how we handle your
                    information when you use our Services by reading our Privacy Policy. We encourage you to give the
                    Privacy Policy a careful look because, by using our Services, you agree that Party-Plug. can
                    collect, use, and share your information consistent with that policy.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>6.
                    Respecting Other People’s Rights</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Party-Plug. respects the rights of others.
                    And so should you. You therefore may not use the Services, or enable anyone else to use the
                    Services, in a manner that:</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- violates or infringes someone else’s
                    rights
                    of publicity, privacy, copyright, trademark, or other intellectual-property
                    right.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- bullies,
                    harasses, or intimidates.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>-
                    defames.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- spams or
                    solicits our users.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>You
                    must
                    also respect Party-Plug’s rights. These Terms do not grant you any right to do any of the following
                    (or enable anyone else to do so):</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- use branding, logos, designs,
                    photographs, videos, or any other materials used in our Services.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- copy,
                    archive, download, upload, distribute, syndicate, broadcast, perform, display, make available, or
                    otherwise use any portion of the Services or the content on the Services except as set forth in
                    these Terms.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- use the
                    Services, any tools provided by the Services, or any
                    content on the Services for any commercial purposes without our consent.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>In
                    short: You may not use the Services or the content on the Services in ways that are not authorized
                    by these Terms. Nor may you help anyone else in doing so.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>7. Respecting
                    Copyright</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Party-Plug
                    honors the requirements set forth in the Digital
                    Millennium Copyright Act. We therefore take reasonable steps to expeditiously remove from our
                    Services any infringing material that we become aware of. And if Party-Plug. becomes aware that one
                    of its users has repeatedly infringed copyrights, we will take reasonable steps within our power to
                    terminate the user’s account.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>We make it easy for you to report suspected
                    copyright infringement. If you believe that anything on the Services infringes a copyright that you
                    own or control you may file a notice with our designated
                    agent:</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Party-Plug.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>If you file a notice with our
                    Copyright Agent, it must comply with the requirements set forth. That means the notice must:</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>-
                    contain the physical or electronic signature of a person authorized to act on behalf of the
                    copyright owner.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>-
                    identify the copyrighted work claimed to have been
                    infringed.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- identify the
                    material that is claimed to be infringing or to
                    be the subject of infringing activity and that is to be removed, or access to which is to be
                    disabled, and information reasonably sufficient to let us locate the
                    material.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- provide your
                    contact information, including your address,
                    telephone number, and an email address.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- provide a personal statement that
                    you have a good-faith belief that the use of the material in the manner complained of is not
                    authorized by the copyright owner, its agent, or the law.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- provide a
                    statement that the information in the notification is accurate and, under penalty of perjury, that
                    you are authorized to act on behalf of the copyright owner.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>8.
                    Safety</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>We try hard to
                    keep our Services a safe place for all users. But we
                    can’t guarantee it. That’s where you come in. By using the Services, you agree
                    that:</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not use
                    the Services for any purpose that is illegal or
                    prohibited in these Terms.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not use any robot, spider,
                    crawler,
                    scraper, or other automated means or interface to access the Services or extract other user’s
                    information.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will
                    not use or develop any third-party applications
                    that interact with the Services or other users’ content or information without our written
                    consent.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not
                    use the Services in a way that could interfere
                    with, disrupt, negatively affect, or inhibit other users from fully enjoying the Services, or that
                    could damage, disable, overburden, or impair the functioning of the
                    Services.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not
                    use or attempt to use another user’s account,
                    username, or password without their permission.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not solicit
                    login credentials from another user.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not post content that
                    contains or links to pornography, graphic violence, threats, hate speech, or incitements to
                    violence.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not
                    upload viruses or other malicious code or
                    otherwise compromise the security of the Services.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not attempt
                    to circumvent any content-filtering techniques we employ, or attempt to access areas or features of
                    the Services that you are not authorized to access.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not probe,
                    scan, or test the vulnerability of our Services or any system or network.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>-
                    You will not encourage or promote any activity that violates these Terms.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>We
                    also care about your safety while using our Services. Do not use our Services in a way that would
                    distract you from obeying traffic or safety laws. For example, never Party-plug and drive. And never
                    put yourself or others in harm’s way just to view a Party.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>9. Your
                    Account</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>You are
                    responsible for any activity that occurs in your Party-Plug
                    account. It is important that you keep your account secure. One way to do that is to select a strong
                    password that you don’t use for any other account.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>By using the Services,
                    you agree that, in addition to exercising common sense:</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not
                    create more than one account for yourself.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not create another
                    account if we have already disabled your account, unless you have our written permission to do
                    so.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not buy,
                    sell, rent, or lease access to your Party-Plug
                    account, Parties, a Party-Plug username, or a friend link without our written
                    permission.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will
                    not share your password.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>-
                    You will not log in or attempt to access the Services through unauthorized third-party applications
                    or clients.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>If you think
                    that someone has gained access to your account,
                    please immediately reach out to Party-Plug Support.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>10. Data Charges and
                    Mobile Phones</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>You are
                    responsible for any mobile charges that you may incur
                    for using our Services, including text-messaging and data charges. If you’re unsure what those
                    charges may be, you should ask your service provider before using the
                    Services.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>If you change
                    or deactivate the mobile phone number that you used
                    to create a Party-Plug account, you must update your account information through Settings within 72
                    hours to prevent us from sending to someone else messages intended for
                    you.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>11. Third-Party
                    Services</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>If you use a
                    service, feature, or functionality that is operated by a third party and made available through our
                    Services (including Services we jointly offer with the third party), each party’s terms will govern
                    the respective party’s relationship with you. Party-Plug. is not responsible or liable for a third
                    party’s terms or actions taken under the third party’s terms.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>12. Modifying
                    the Services and Termination</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>We’re relentlessly improving our Services
                    and
                    creating new ones all the time. That means we may add or remove features, products, or
                    functionalities, and we may also suspend or stop the Services altogether. We may take any of these
                    actions at any time, and when we do, we may not provide you with any notice
                    beforehand.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>While we hope
                    you remain a lifelong Party-Plugger, you can
                    terminate these Terms at any time and for any reason by deleting your
                    account.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Party-Plug. may
                    also terminate these Terms with you at any time,
                    for any reason, and without advanced notice. That means that we may stop providing you with any
                    Services, or impose new or additional limits on your ability to use our Services. For example, we
                    may deactivate your account due to prolonged inactivity, and we may reclaim your username at any
                    time for any reason.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Regardless
                    of who terminates these Terms, both you and
                    Party-Plug. continue to be bound by Sections 3, 6, 9, 10, and 13-22 of the
                    Terms.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>13.
                    Indemnity</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>You agree, to
                    the extent
                    permitted by law, to indemnify, defend, and hold harmless Party-Plug., our affiliates, directors,
                    officers, stockholders, employees, licensors, and agents from and against any and all complaints,
                    charges, claims, damages, losses, costs, liabilities, and expenses (including attorneys’ fees) due
                    to, arising out of, or relating in any way to: (a) your access to or use of the Services; (b) your
                    content; and (c) your breach of these Terms.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>14.
                    Disclaimers</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>We try to
                    keep the Services up and running and free of
                    annoyances. But we make no promises that we will succeed.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>THE SERVICES ARE
                    PROVIDED “AS IS” AND “AS AVAILABLE” AND TO THE EXTENT PERMITTED BY LAW WITHOUT WARRANTIES OF ANY
                    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF
                    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. IN ADDITION, WHILE
                    PARTY-PLUG. ATTEMPTS TO PROVIDE A GOOD USER EXPERIENCE, WE DO NOT REPRESENT OR WARRANT THAT: (A) THE
                    SERVICES WILL ALWAYS BE SECURE, ERROR-FREE, OR TIMELY; (B) THE SERVICES WILL ALWAYS FUNCTION WITHOUT
                    DELAYS, DISRUPTIONS, OR IMPERFECTIONS; OR (C) THAT ANY CONTENT, USER CONTENT, OR INFORMATION YOU
                    OBTAIN ON OR THROUGH THE SERVICES WILL BE TIMELY OR ACCURATE.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>PARTY-PLUG.
                    TAKES NO RESPONSIBILITY AND ASSUMES NO LIABILITY FOR ANY CONTENT THAT YOU, ANOTHER USER, OR A THIRD
                    PARTY CREATES, UPLOADS, POSTS, SENDS, RECEIVES, OR STORES ON OR THROUGH OUR SERVICES. YOU UNDERSTAND
                    AND AGREE THAT YOU MAY BE EXPOSED TO CONTENT THAT MIGHT BE OFFENSIVE, ILLEGAL, MISLEADING, OR
                    OTHERWISE INAPPROPRIATE, NONE OF WHICH PARTY-PLUG. WILL BE RESPONSIBLE
                    FOR.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>15. Limitation of
                    Liability</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>TO THE MAXIMUM
                    EXTENT PERMITTED BY LAW, PARTY-PLUG. AND OUR MANAGING MEMBERS, SHAREHOLDERS, EMPLOYEES, AFFILIATES,
                    LICENSORS, AGENTS, AND SUPPLIERS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                    CONSEQUENTIAL, PUNITIVE, OR MULTIPLE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED
                    DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING
                    FROM: (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES; (B) THE CONDUCT OR
                    CONTENT OF OTHER USERS OR THIRD PARTIES ON OR THROUGH THE SERVICES; OR (C) UNAUTHORIZED ACCESS, USE,
                    OR ALTERATION OF YOUR CONTENT, EVEN IF PARTY-PLUG. HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
                    DAMAGES. IN NO EVENT WILL PARTY-PLUG.’S AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICES
                    EXCEED THE GREATER OF $100 USD OR THE AMOUNT YOU PAID PARTY-PLUG., IF ANY, IN THE LAST 12
                    MONTHS.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>16. Arbitration,
                    Class-Action Waiver, and Jury Waiver</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>PLEASE
                    READ THE FOLLOWING PARAGRAPHS CAREFULLY BECAUSE THEY REQUIRE YOU AND PARTY-PLUG. TO AGREE TO RESOLVE
                    ALL DISPUTES BETWEEN US THROUGH BINDING INDIVIDUAL ARBITRATION.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>a.
                    Applicability of Arbitration Agreement. You and Party-Plug. agree that all claims and disputes
                    (whether contract, tort, or otherwise), including all statutory claims and disputes, arising out of
                    or relating to these Terms or the use of the Services that cannot be resolved in small claims court
                    will be resolved by binding arbitration on an individual basis, except that you and Party-Plug. are
                    not required to arbitrate any dispute in which either party seeks equitable relief for the alleged
                    unlawful use of copyrights, trademarks, trade names, logos, trade secrets, or patents. To be clear:
                    The phrase “all claims and disputes” also includes claims and disputes that arose between us before
                    the effective date of these Terms.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>b. Arbitration Rules. The Federal
                    Arbitration Act governs the interpretation and enforcement of this dispute-resolution provision.
                    Arbitration will be initiated through the American Arbitration Association (“AAA”) and will be
                    governed by the AAA Consumer Arbitration Rules, available here as of the date of these Terms, or by
                    calling the AAA at 1-800-778-7879. If the AAA is not available to arbitrate, the parties will select
                    an alternative arbitral forum. The rules of the arbitral forum will govern all aspects of this
                    arbitration, except to the extent those rules conflict with these Terms. The arbitration will be
                    conducted by a single neutral arbitrator. Any claims or disputes where the total amount sought is
                    less than $10,000 USD may be resolved through binding non-appearance-based arbitration, at the
                    option of the party seeking relief. For claims or disputes where the total amount sought is $10,000
                    USD or more, the right to a hearing will be determined by the arbitral forum’s rules. Any judgment
                    on the award rendered by the arbitrator may be entered in any court of competent
                    jurisdiction.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>c.
                    Additional Rules for Non-appearance Arbitration. If
                    non-appearance arbitration is elected, the arbitration will be conducted by telephone, online,
                    written submissions, or any combination of the three; the specific manner will be chosen by the
                    party initiating the arbitration. The arbitration will not involve any personal appearance by the
                    parties or witnesses unless the parties mutually agree otherwise.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>d. Fees.
                    If you choose to arbitrate with Party-Plug., you will not have to pay any fees to do so. That is
                    because Party-Plug. will reimburse you for your filing fee and the AAA’s Consumer Arbitration Rules
                    provide that any hearing fees and arbitrator compensation are our responsibility. To the extent
                    another arbitral forum is selected, Party-Plug. will pay that forum’s fees as
                    well.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>e. Authority of the
                    Arbitrator. The arbitrator will decide the
                    jurisdiction of the arbitrator and the rights and liabilities, if any, of you and Party-Plug. The
                    dispute will not be consolidated with any other matters or joined with any other cases or parties.
                    The arbitrator will have the authority to grant motions dispositive of all or part of any claim or
                    dispute. The arbitrator will have the authority to award monetary damages and to grant any
                    non-monetary remedy or relief available to an individual under law, the arbitral forum’s rules, and
                    the Terms. The arbitrator will issue a written award and statement of decision describing the
                    essential findings and conclusions on which the award is based, including the calculation of any
                    damages awarded. The arbitrator has the same authority to award relief on an individual basis that a
                    judge in a court of law would have. The award of the arbitrator is final and binding upon you and
                    Party-Plug.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>f. Waiver of
                    Jury Trial. YOU AND PARTY-PLUG. WAIVE ANY
                    CONSTITUTIONAL AND STATUTORY RIGHTS TO GO TO COURT AND HAVE A TRIAL IN FRONT OF A JUDGE OR A JURY.
                    You and Party-Plug. are instead electing to have claims and disputes resolved by arbitration.
                    Arbitration procedures are typically more limited, more efficient, and less costly than rules
                    applicable in court and are subject to very limited review by a court. In any litigation between you
                    and Party-Plug. over whether to vacate or enforce an arbitration award, YOU AND PARTY-PLUG. WAIVE
                    ALL RIGHTS TO A JURY TRIAL, and elect instead to have the dispute be resolved by a
                    judge.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>g. Waiver of Class
                    or Consolidated Actions. ALL CLAIMS AND DISPUTES
                    WITHIN THE SCOPE OF THIS ARBITRATION AGREEMENT MUST BE ARBITRATED OR LITIGATED ON AN INDIVIDUAL
                    BASIS AND NOT ON A CLASS BASIS. CLAIMS OF MORE THAN ONE CUSTOMER OR USER CANNOT BE ARBITRATED OR
                    LITIGATED JOINTLY OR CONSOLIDATED WITH THOSE OF ANY OTHER CUSTOMER OR USER. If, however, this waiver
                    of class or consolidated actions is deemed invalid or unenforceable, neither you nor we are entitled
                    to arbitration; instead all claims and disputes will be resolved in a court as set forth in Section
                    18.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>h. Right to Waive.
                    Any rights and limitations set forth in this
                    arbitration agreement may be waived by the party against whom the claim is asserted. Such waiver
                    will not waive or affect any other portion of this arbitration agreement.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>i.
                    Opt-out. You may opt out of this arbitration agreement. If you do so, neither you nor Party-Plug.
                    can force the other to arbitrate. To opt out, you must notify Party-Plug. in writing no later than
                    30 days after first becoming subject to this arbitration agreement. Your notice must include your
                    name and address, your Party-Plug username and the email address you used to set up your Party-Plug
                    account (if you have one), and an unequivocal statement that you want to opt out of this arbitration
                    agreement. You must either mail your opt-out notice to this address: Party-Plug, or email the
                    opt-out notice to http://party-plug.com/ .</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>j. Small Claims Court.
                    Notwithstanding the foregoing, either you or Party-Plug. may bring an individual action in small
                    claims court.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>k.
                    Arbitration Agreement Survival. This arbitration agreement
                    will survive the termination of your relationship with Party-Plug.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>17.
                    Exclusive Venue</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>To the
                    extent that these Terms allow you or Party-Plug. to
                    initiate litigation in a court, both you and Party-Plug. agree that all claims and disputes (whether
                    contract, tort, or otherwise), including statutory claims and disputes, arising out of or relating
                    to the Terms or the use of the Services will be litigated exclusively in the United States District
                    Court for the Central District of Michigan. If, however, that court would lack original jurisdiction
                    over the litigation, then all such claims and disputes will be litigated exclusively in the Superior
                    Court of Michigan, County of Wayne. You and Party-Plug. consent to the personal jurisdiction of both
                    courts.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>18. Choice of
                    Law</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Except to the extent
                    they are preempted by U.S. federal law, the laws of Michigan, other than its conflict-of-laws
                    principles, govern these Terms and any claims and disputes (whether contract, tort, or otherwise)
                    arising out of or relating to these Terms or their subject matter.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>19.
                    Severability</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>If any
                    provision of these Terms is found unenforceable, then
                    that provision will be severed from these Terms and not affect the validity and enforceability of
                    any remaining provisions.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>20. Additional Terms for Specific
                    Services</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Given
                    the breadth of our Services, we sometimes need to craft additional terms and conditions for specific
                    Services. Those additional terms and conditions, which will be available with the relevant Services,
                    then become part of your agreement with us if you use those Services. If any part of those
                    additional terms and conditions conflicts with these Terms, the additional terms and conditions will
                    prevail.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>21. Final
                    Terms</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- These Terms
                    (together
                    with any additional terms applicable to specific Services you use) make up the entire agreement
                    between you and Party-Plug and supersede any prior agreements.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- These
                    Terms do not create or confer any third-party beneficiary rights.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- If we
                    do not enforce a provision in these Terms, it will not be considered a
                    waiver.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- We reserve all
                    rights not expressly granted to you.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>-
                    You may not transfer any of your rights or obligations under these Terms without our consent.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Contact
                    Us</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Party-Plug. welcomes
                    comments, questions, concerns, or suggestions.
                    Please send us feedback by visiting http://party-plug.com/ </Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Party-Plug is
                    located in the United States</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text></Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text></Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>(Outside
                    of the U.S.)</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Welcome!</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>We’ve drafted these Terms of
                    Service (which we call the “Terms”) so you’ll know the rules that govern our relationship with you.
                    Although we have tried our best to strip the legalese from the Terms, there are places where these
                    Terms may still read like a traditional contract. There’s a good reason for that: these Terms do
                    indeed form a legally binding contract between you and Party-Plug. Please read them
                    carefully.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>In order to
                    use Party-Plug or any of our other products or
                    services that link to these Terms (we refer to these simply as the “Services”), you must have
                    accepted our Terms and Privacy Policy, which are presented to you (i) when you first open the app
                    and (ii) when we make any material changes to the Terms or the Privacy Policy. Of course, if you
                    don’t accept them, then don’t use the Services.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>These Terms apply to you if
                    you live outside the United States or if you are using the Services on behalf of a business located
                    outside the United States.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>ARBITRATION NOTICE: IF YOU’RE USING THE
                    SERVICES
                    ON BEHALF OF A BUSINESS, THEN YOUR BUSINESS WILL BE BOUND BY THE ARBITRATION CLAUSETHAT APPEARS
                    LATER IN THESE TERMS.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text></Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>1. Who can use the
                    Services</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>No one under 13
                    is allowed to create an account or use the
                    Services. We may offer additional Services with additional terms that may require you to be even
                    older to use them. Please read all terms carefully.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>By using the Services,
                    you state that:</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- you can
                    form a binding contract with
                    Party-Plug.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- you are not
                    a person who is barred from receiving the
                    Services under the laws of the United States, the United Kingdom, or any other applicable
                    jurisdiction—meaning that you do not appear on the U.S. Treasury Department’s list of Specially
                    Designated Nationals or face any other similar prohibition.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- you will
                    comply with these Terms and all applicable local, state, national, and international laws, rules,
                    and regulations.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>If you
                    are using the Services on behalf of a business or
                    some other entity, you state that you are authorized to grant all licenses set out in these Terms
                    and to agree to these Terms on behalf of the business or entity.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>2. Rights
                    we grant you</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Party-Plug
                    grants you a personal, worldwide, royalty-free,
                    non-assignable, non-exclusive, revocable, and non-sublicensable license to access and use the
                    Services. This license is for the sole purpose of letting you use and enjoy the Services’ benefits
                    in a way that these Terms and our usage policies, such as our Community Guidelines,
                    allow.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Any software that
                    we provide you may automatically download and
                    install upgrades, updates, or other new features. You may be able to adjust these automatic
                    downloads through your device’s settings.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>You may not copy, modify,
                    distribute, sell, or lease any part of our Services. Nor may you reverse engineer or attempt to
                    extract the source code of that software, unless laws prohibit these restrictions or you have our
                    written permission to do so.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>3. Rights you grant
                    us</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Many of our Services
                    let you create, upload, post, send, receive, and
                    store content. When you do that, you retain whatever ownership rights in that content you had to
                    begin with. But you grant us a license to use that content. How broad that license is depends on
                    which Services you use and the settings you have selected.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>We call party
                    submissions that are set to be viewable by Everyone as well as content you submit to crowd-sourced
                    Services, including Our Party, “Public Content.” For all content you submit to the Services other
                    than Public Content, you grant Party-Plug and their affiliates a worldwide, royalty-free,
                    sublicensable, and transferable license to host, store, use, display, reproduce, modify, adapt,
                    edit, publish, and distribute that content for as long as you use the Services. This license is for
                    the limited purpose of operating, developing, providing, promoting, and improving the Services and
                    researching and developing new ones.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Because Public Content is public by
                    nature and records matters of public interest, the license you grant us for this content is broader.
                    In addition to granting us the rights mentioned in the previous paragraph, you also grant us a
                    license to create derivative works from, promote, exhibit, broadcast, syndicate, sublicense,
                    publicly perform and publicly display Public Content in any form and in any and all media or
                    distribution methods (now known or later developed). To the extent it’s necessary, when you appear
                    in, create, upload, post or send Public Content, you also grant Party-Plug and our affiliates and
                    business partners the unrestricted, worldwide right and license to use your name, likeness, and
                    voice. This means, among other things, that you will not be entitled to any compensation from
                    Party-Plug or our affiliates and business partners if your name, likeness, or voice is conveyed
                    through the Services, either on the Party-Plug application or on one of our business partners’
                    platforms.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>For more
                    information about how to tailor who can watch your
                    content, please take a look at our Privacy Policy and Support Site.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>We
                    reserve the right to delete any content (i) which we think violates these Terms or our Community
                    Guidelines, or (ii) if necessary to comply with our legal obligations. However, you alone, remain
                    responsible for the content you create, upload, post, send, or store through the
                    Services.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>The Services
                    may contain advertisements. In consideration for
                    Party-Plug letting you access and use the Services, you agree that we, Party-Plug, our affiliates,
                    and our third-party partners may place advertising on the Services, including personalized
                    advertising based upon the information you provide us or we collect or obtain about you. Because the
                    Services contain content that you and other users provide us, advertising may sometimes appear near,
                    between, over, or in your content.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>We always love to hear from our users.
                    But if you volunteer feedback or suggestions, just know that we can use your ideas without
                    compensating you.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>4. The
                    content of others</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Much of
                    the content on our Services is produced by users, publishers, and other third parties. Whether that
                    content is posted publicly or sent privately, the content is the sole responsibility of the person
                    or organization that submitted it. Although Party-Plug reserves the right to review all content that
                    appears on the Services and to remove any content that violates these Terms, our Community
                    Guidelines or the law, we do not necessarily review all of it.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Through
                    these Terms and our Community Guidelines, we make clear that we don't want the Services to be put to
                    bad uses. But because we don't review all content, we cannot guarantee that content on the Services
                    will always conform to our Terms or Guidelines.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>5.
                    Privacy</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Your privacy
                    matters to us. You can learn how your information is
                    handled when you use our Services by reading the Privacy Policy.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>6.
                    Respecting other people’s rights</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Party-Plug respects the rights of others.
                    And so should you. You therefore may not use the Services, or enable anyone else to use the
                    Services, in a manner that:</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- violates or infringes someone else’s
                    rights
                    of publicity, privacy, copyright, trademark, or other intellectual-property
                    right;</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- bullies,
                    harasses, or intimidates;</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>-
                    defames;</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- spams or
                    solicits our users.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>You
                    must
                    also respect the rights of Party-Plug and its affiliates, including Party-Plug These Terms do not
                    grant you any right to do any of the following (or enable anyone else do
                    so):</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- use branding,
                    logos, designs, photographs, videos, or any other
                    materials used in our Services;</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- copy, archive, download, upload,
                    distribute, syndicate, broadcast, perform, display, make available, or otherwise use any portion of
                    the Services or the content on the Services except as authorized in these Terms;</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>-
                    use the Services, any tools provided by the Services, or any content on the Services for any
                    commercial purposes without our consent.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>7. Respecting
                    copyright</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>We respect
                    copyright law. We therefore take reasonable steps to
                    expeditiously remove from our Services any infringing material that we become aware of. And if
                    Party-Plug becomes aware that one of its users has repeatedly infringed copyrights, we will take
                    reasonable steps within our power to terminate the user’s account.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>We make
                    it easy for you to report suspected copyright infringement. If you believe that anything on the
                    Services infringes a copyright that you own or control, please file a notice with our designated
                    agent:</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Party-Plug</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>If you file a notice with our
                    Copyright Agent, it must:</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- contain the physical or electronic
                    signature of
                    a person authorized to act on behalf of the copyright owner;</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- identify the
                    copyrighted work claimed to have been infringed;</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- identify the material
                    that is claimed to be infringing or to be the subject of infringing activity and that is to be
                    removed, or access to which is to be disabled, and information reasonably sufficient to let us
                    locate the material;</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>-
                    provide your contact information, including your
                    address, telephone number, and an email address;</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- provide a personal
                    statement that you have a good-faith belief that the use of the material in the manner complained of
                    is not authorized by the copyright owner, its agent, or the law;</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- provide
                    a statement that the information in the notification is accurate and, under penalty of perjury, that
                    you are authorized to act on behalf of the copyright owner.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>8.
                    Safety</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>We try hard to
                    keep our Services a safe place for all users. But we
                    can’t guarantee it. That’s where you come in. By using the Services, you agree
                    that:</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not use
                    the Services for any purpose that is illegal or
                    prohibited in these Terms.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not use any robot, spider,
                    crawler,
                    scraper, or other automated means or interface to access the Services or extract other users’
                    information.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will
                    not use or develop any third-party applications
                    that interact with the Services or other users’ content or information without our written
                    consent.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not
                    use the Services in a way that could interfere
                    with, disrupt, affect negatively, or inhibit other users from fully enjoying the Services, or that
                    could damage, disable, overburden, or impair the functioning of the
                    Services.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not
                    use or attempt to use another user’s account,
                    username, or password without their permission.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not solicit
                    login credentials from another user.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not post content that
                    contains pornography, graphic violence, threats, hate speech, or incitements to
                    violence.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not
                    upload viruses or other malicious code or
                    otherwise compromise the security of the Services.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not attempt
                    to circumvent any content-filtering techniques we employ, or attempt to access areas or features of
                    the Services that you are not authorized to access.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not probe,
                    scan, or test the vulnerability of our Services or any system or network.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>-
                    You will not encourage or promote any activity that violates these Terms.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>We
                    also care about your safety while using our Services. Do not use our Services in a way that would
                    distract you from obeying traffic or safety laws. For example, never party-plug and drive. And never
                    put yourself or others in harm’s way just to find a party.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>9. Your
                    account</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>You are
                    responsible for any activity that occurs in your Party-Plug
                    account. So it’s important that you keep your account secure. One way to do that is to select a
                    strong password that you don’t use for any other account.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>By using the
                    Services, you agree that, in addition to exercising common sense:</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You
                    will not create more than 1 account for yourself.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not create
                    another account if we have already disabled your account, unless you have our written permission to
                    do so.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will not
                    buy, sell, rent or lease access to your Party-Plug
                    account, a Party-Plug username or a friend link without our written
                    permission.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You will
                    not share your password.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>-
                    You will not log in or attempt to access the Services through unauthorized third-party applications
                    or clients.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>If you think
                    that someone has gained access to your account,
                    please reach out immediately to Party-Plug.com </Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text></Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>10.
                    Data charges and mobile phones</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>You
                    are responsible for any mobile charges
                    that you may incur for using our Services, including text-messaging and data charges. If you’re
                    unsure what those charges may be, you should ask your service provider before using the
                    Services.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>If you change
                    or deactivate the mobile phone number that you used
                    to create a Party-Plug account, you must update your account information through Settings within 72
                    hours to prevent us from sending to someone else messages intended for
                    you.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>11. Third-party
                    services</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>If you use a
                    service, feature or functionality that is operated by a third party and made available through our
                    Services (including Services we offer jointly with the third party), each party’s terms will govern
                    the respective party’s relationship with you. Party-Plug is not responsible or liable for a third
                    party’s terms or actions taken under the third party’s terms.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>12. Modifying
                    the Services and termination</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>We’re relentlessly improving our Services
                    and
                    creating new ones all the time. This means that we may add or remove features, products, or
                    functionalities, and we may also suspend or stop the Services altogether. We may take any of these
                    actions at any time, and when we do, we will try to notify you beforehand - but this won’t always be
                    possible.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Though we hope
                    you remain a lifelong Party-Plugger, you can
                    terminate these Terms at any time and for any reason by deleting your
                    account.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Party-Plug may
                    also terminate these Terms with you if you fail to
                    comply with these Terms, our Community Guidelines or the law, or for any reason outside of our
                    control. And while we’ll try to give you advance notice, we can’t guarantee it. Our right to
                    terminate these Terms means that we may stop providing you with any Services, or impose new or
                    additional limits on your ability to use the Services. For example, we may deactivate your account
                    due to prolonged inactivity, and we may reclaim your username at any time for any
                    reason.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Regardless of who
                    terminates these Terms, both you and Party-Plug
                    continue to be bound by Sections 3, 6, 9, 10 and 13-22 of the Terms.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>13.
                    Indemnity</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>You agree, to
                    the extent permitted by law, to indemnify, defend
                    and hold harmless Party-Plug and our affiliates, directors, officers, stockholders, employees,
                    licensors, suppliers, and agents from and against any complaints, charges, claims, damages, losses,
                    costs, liabilities and expenses (including attorneys’ fees) due to, arising out of, or relating in
                    any way to: (a) your access to or use of the Services; (b) your content; and (c) your breach of
                    these Terms.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>14.
                    Disclaimers</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>We try to
                    keep the
                    Services up and running and free of annoyances. But we cannot promise that we will always
                    succeed.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>The Services are
                    provided “as is” and “as available” and to the
                    extent permitted by law without warranties of any kind, either express or implied, including, in
                    particular implied warranties, conditions, or other terms relating to (i) merchantability,
                    satisfactory quality, fitness for a particular purpose, title, quiet enjoyment, non-infringement, or
                    (ii) arising from a course of dealing. In addition, while Party-Plug attempts to provide a good user
                    experience, we do not represent or warrant that: (a) the Services will always be secure, error-free
                    or timely; (b) the Services will always function without delays, disruption or imperfections; or (c)
                    that any content or information you obtain through the Services will be timely or
                    accurate.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>IF THE LAW OF
                    THE COUNTRY WHERE YOU LIVE DOES NOT ALLOW THE
                    EXCLUSIONS OF LIABILITY PROVIDED FOR IN THIS CLAUSE, THOSE EXCLUSIONS SHALL NOT APPLY.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Party-Plug
                    and their affiliates take no responsibility and assume no liability for any content that you,
                    another user, or a third party creates, uploads, posts, sends, receives, or stores on or through our
                    Services. You understand and agree that you may be exposed to content that might be offensive,
                    illegal, misleading, or otherwise inappropriate, none of which Party-Plug, nor their affiliates will
                    be responsible for.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Nothing
                    in these Terms will exclude or limit any
                    responsibility we may have to remove content if so required by the law of the country where you
                    live.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>15. Limitation of
                    liability</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Party-Plug and
                    our affiliates, directors, officers, stockholders, employees, licensors, suppliers, and agents will
                    not be liable for any indirect, incidental, special, consequential, punitive, or multiple damages,
                    or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data,
                    use, goodwill or other intangible losses, resulting from: (a) your use of the Services or inability
                    to use the Services; (b) your access to or inability to access the Services; (c) the conduct or
                    content of other users or third parties on or through the Services; or (d) unauthorized access, use
                    or alteration of your content. In no event will Party-Plug or their affiliates’ aggregate liability
                    for all claims relating to the Services exceed the greater of €100 EUR or the amount you paid
                    Party-Plug in the last 12 months for any paid Services.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>IF THE LAW OF THE
                    COUNTRY WHERE YOU LIVE DOES NOT ALLOW ANY LIMITATION OF LIABILITY PROVIDED FOR IN THIS CLAUSE, THAT
                    LIMITATION WILL NOT APPLY.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>16. Dispute resolution,
                    arbitration</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>If you have a
                    concern, let’s talk. Go ahead and contact us
                    first and we’ll do our best to resolve the issue.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Some of our Services may
                    have additional terms that contain dispute-resolution provisions unique to that Service or your
                    residency.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>If you are
                    using the Services on behalf of a business (rather
                    than for your personal use), you and Party-Plug agree that to the extent permitted by law, all
                    claims and disputes between us arising out of or relating to these Terms or the use of the Services
                    will be finally settled under the LCIA Arbitration Rules, which are incorporated by reference into
                    this clause. There will be one arbitrator (to be appointed by the LCIA), the arbitration will take
                    place in London, and the arbitration will be conducted in English. If you do not wish to agree to
                    this clause, you must not use the Services.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>17. Exclusive
                    venue</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>To the extent the
                    parties are permitted under these Terms to initiate
                    litigation in a court, both you and Party-Plug agree that all claims and disputes (whether
                    contractual or otherwise) arising out of or relating to the Terms or the use of the Services will be
                    litigated exclusively in the courts of England in the United Kingdom, unless this is prohibited by
                    the laws of the country where you reside. You and Party-Plug consent to the exclusive jurisdiction
                    of those courts.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>18.
                    Choice of law</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>The laws of
                    England and Wales govern these Terms and any claims and disputes (whether contractual or otherwise)
                    arising out of or relating to these Terms or their subject matter. The courts in some countries may
                    not apply the laws of England and Wales to some disputes related to these Terms. If you reside in
                    one of those countries, the laws of your home country may apply to those
                    disputes.</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>19.
                    Severability</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>If any
                    provision of
                    these Terms is found unenforceable, then that provision will be severed from these Terms and not
                    affect the validity and enforceability of any remaining provisions.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>20.
                    Additional terms for specific Services</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Given the breadth of our Services,
                    we sometimes need to craft additional terms and conditions for specific Services. Those additional
                    terms and conditions, which will be presented to you before you access the relevant Services, then
                    become part of your agreement with us when you accept them. If any part of those additional terms
                    and conditions conflicts with these Terms, the additional terms and conditions will prevail.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>21.
                    Final terms</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- These Terms
                    make up the entire agreement between you and
                    Party-Plug and supersede any prior agreements.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- These Terms do not create
                    or confer any third-party beneficiary rights.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- If we do not enforce a
                    provision in these Terms, it will not be considered a waiver.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- We reserve
                    all rights not expressly granted to you.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>- You may not transfer any of your
                    rights or obligations under these Terms without our consent.</Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Contact
                    Us</Text></View><View style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Party-Plug. welcomes
                    comments, questions, concerns, or suggestions.
                    Please send us feedback by visiting http://party-plug.com/ </Text></View><View
                    style={{marginTop: 10, alignItems: 'flex-start'}}><Text>Party-Plug is
                    located in the United States </Text></View>

                </ScrollView>
            </KeyboardAwareScrollView>
        );
    }
}

export default EulaPage;

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        backgroundColor: 'purple',
        marginTop: 20
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


