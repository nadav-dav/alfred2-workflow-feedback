var rek = require('rekuire');
var alfred = require('../');
var assert = require('assert');

describe('Alfred 2 Feedback', function() {
    it('should return a valid xml output', function() {
        var expectedResult = '<?xml version="1.0" encoding="UTF-8"?>' +
            '<items>' +
            '   <item arg="hello" valid="yes">' +
            '       <title>hello</title>' +
            '   </item>' +
            '   <item arg="world" valid="yes">' +
            '       <title>world</title>' +
            '   </item>' +
            '</items>';

        var res = alfred.feedback(["hello", "world"])
        assertXmlEqual(res, expectedResult);
    });

    it('should allow responses to be auto completed', function() {
        var expectedResult = '<?xml version="1.0" encoding="UTF-8"?>' +
            '<items>' +
            '   <item arg="hello" valid="yes" autocomplete="hello">' +
            '       <title>hello</title>' +
            '   </item>' +
            '</items>';

        var res = alfred.feedback(["hello"], {
            autocomplete: true
        })
        assertXmlEqual(res, expectedResult);
    });

    it('should be able to add icons', function() {
        var expectedResult = '<?xml version="1.0" encoding="UTF-8"?>' +
            '<items>' +
            '   <item arg="hello" valid="yes">' +
            '       <title>hello</title>' +
            '		<icon>icon.png</icon>' +
            '   </item>' +
            '</items>';

        var res = alfred.feedback(["hello"], {
            icons: "icon.png"
        })
        assertXmlEqual(res, expectedResult);
    });




    function assertXmlEqual(xml1, xml2) {
        assert.equal(
            removeSpaces(xml1),
            removeSpaces(xml2)
        );
    }

    function removeSpaces(xml) {
        return xml.replace(/>\s+</g, "><")
    }
});