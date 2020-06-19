const Tests = {
  run: (Setup, gen) => {
    const Utils = Setup.Utils;
    const assert = Setup.chai.assert;
    const uiTester = Setup.Utils.uiTester;
    const Upvote = Setup.Upvote;
    const $ = Setup.jQuery;

    const demo = params => {
      $('#demo').append(Utils.newDom(params));
      Upvote.create(params.id);
    };
    if (Setup.demo) {
      demo({id: 'demo1', count: 0});
      demo({id: 'demo2', count: 1, upvoted: true});
      demo({id: 'demo3', count: -1, downvoted: true});
      demo({id: 'unix', count: 3, upvoted: true, starred: true, skin: 'unix'});
      demo({id: 'serverfault', count: 3, upvoted: true, starred: true, skin: 'serverfault'});
      demo({id: 'superuser', count: 3, upvoted: true, starred: true, skin: 'superuser'});
    }

    describe('initialize from params', () => {
      describe('for empty params', () => {
        const obj = gen();
        it('should have state count 0, not upvoted, not downvoted, not starred', () => {
          assert.equal(obj.count(), 0);
          assert.equal(obj.upvoted(), false);
          assert.equal(obj.downvoted(), false);
          assert.equal(obj.starred(), false);
        });
      });

      describe('for explicitly set fields', () => {
        it('should have given values', () => {
          assert.equal(gen({count: 17}).count(), 17);
          assert.equal(gen({upvoted: true}).upvoted(), true);
          assert.equal(gen({downvoted: true}).downvoted(), true);
          assert.equal(gen({starred: true}).starred(), true);
        });
      });

      describe('for explicitly set fields of invalid type', () => {
        it('should throw', () => {
          assert.throws(() => gen({count: 'foo'}), /"count" must be a valid integer/);
          assert.throws(() => gen({upvoted: 'foo'}), /"upvoted" must be a boolean/);
          assert.throws(() => gen({downvoted: 'foo'}), /"downvoted" must be a boolean/);
          assert.throws(() => gen({starred: 'foo'}), /"starred" must be a boolean/);
          assert.throws(() => gen({callback: 'foo'}), /"callback" must be a function/);
        });
      });

      describe('for other kind of invalid parameters', () => {
        it('should throw', () => {
          assert.throws(() => gen({upvoted: true, downvoted: true}), /must not be true at the same time/);
        });
      });
    });

    describe('initialize from dom', () => {
      it('should pick up values from the DOM', () => {
        const v1 = Upvote.create(Utils.addNewDom({count: 1}).attr('id'));
        assert.equal(v1.count(), 1);
        assert.equal(v1.upvoted(), false);
        assert.equal(v1.downvoted(), false);
        assert.equal(v1.starred(), false);

        const v2 = Upvote.create(Utils.addNewDom({count: 2, upvoted: true}).attr('id'));
        assert.equal(v2.count(), 2);
        assert.equal(v2.upvoted(), true);
        assert.equal(v2.downvoted(), false);
        assert.equal(v2.starred(), false);

        const v3 = Upvote.create(Utils.addNewDom({count: 3, upvoted: true, starred: true}).attr('id'));
        assert.equal(v3.count(), 3);
        assert.equal(v3.upvoted(), true);
        assert.equal(v3.downvoted(), false);
        assert.equal(v3.starred(), true);

        const v4 = Upvote.create(Utils.addNewDom({count: 4, downvoted: true}).attr('id'));
        assert.equal(v4.count(), 4);
        assert.equal(v4.upvoted(), false);
        assert.equal(v4.downvoted(), true);
        assert.equal(v4.starred(), false);

        const v5 = Upvote.create(Utils.addNewDom({count: 5, downvoted: true, starred: true}).attr('id'));
        assert.equal(v5.count(), 5);
        assert.equal(v5.upvoted(), false);
        assert.equal(v5.downvoted(), true);
        assert.equal(v5.starred(), true);

        const vLarge = Upvote.create(Utils.addNewDom({count: 456789}).attr('id'));
        assert.equal(vLarge.count(), 456789);
        assert.equal(vLarge.upvoted(), false);
        assert.equal(vLarge.downvoted(), false);
        assert.equal(vLarge.starred(), false);

        const vNegativeLarge = Upvote.create(Utils.addNewDom({count: -456789}).attr('id'));
        assert.equal(vNegativeLarge.count(), -456789);
        assert.equal(vNegativeLarge.upvoted(), false);
        assert.equal(vNegativeLarge.downvoted(), false);
        assert.equal(vNegativeLarge.starred(), false);
      });

      it('should throw when DOM defines upvoted + downvoted', () => {
        assert.throws(() => Upvote.create(Utils.addNewDom({upvoted: true, downvoted: true})));
      });
    });

    describe('UI gets updated from initial params', () => {
      describe('for empty params', () => {
        const obj = uiTester(gen());
        it('should have state count 0, not upvoted, not downvoted, not starred', () => {
          assert.equal(obj.count(), 0);
          assert.equal(obj.upvoted(), false);
          assert.equal(obj.downvoted(), false);
          assert.equal(obj.starred(), false);
        });
      });

      describe('for explicitly set fields', () => {
        it('should have given values', () => {
          assert.equal(uiTester(gen({count: 17})).count(), 17);
          assert.equal(uiTester(gen({upvoted: true})).upvoted(), true);
          assert.equal(uiTester(gen({downvoted: true})).downvoted(), true);
          assert.equal(uiTester(gen({starred: true})).starred(), true);
        });
      });
    });

    describe('upvote and un-upvote', () => {
      const obj = gen({count: 5});
      it('should increment count on upvote', () => {
        obj.upvote();
        assert.equal(obj.count(), 6);
        assert.equal(obj.upvoted(), true);
      });
      it('should decrement count on upvote again', () => {
        obj.upvote();
        assert.equal(obj.count(), 5);
        assert.equal(obj.upvoted(), false);
      });
    });

    describe('downvote and un-downvote', () => {
      const obj = gen({count: 5});
      it('should decrement count on downvote', () => {
        obj.downvote();
        assert.equal(obj.count(), 4);
        assert.equal(obj.downvoted(), true);
      });
      it('should increment count on downvote again', () => {
        obj.downvote();
        assert.equal(obj.count(), 5);
        assert.equal(obj.downvoted(), false);
      });
    });

    describe('upvote and downvote', () => {
      it('should increment count by 2 on upvote downvoted', () => {
        const obj = gen({count: 5, downvoted: true});
        obj.upvote();
        assert.equal(obj.count(), 7);
        assert.equal(obj.upvoted(), true);
        assert.equal(obj.downvoted(), false);
      });
      it('should decrement count by 2 on downvote upvoted', () => {
        const obj = gen({count: 5, upvoted: true});
        obj.downvote();
        assert.equal(obj.count(), 3);
        assert.equal(obj.upvoted(), false);
        assert.equal(obj.downvoted(), true);
      });
    });

    describe('star and un-star', () => {
      const obj = gen();
      it('should set starred on star', () => {
        obj.star();
        assert.equal(obj.starred(), true);
      });
      it('should unset starred on star again', () => {
        obj.star();
        assert.equal(obj.starred(), false);
      });
    });

    describe('separate widgets', () => {
      it('should get upvoted independently', () => {
        const v1 = gen({count: 10});
        const v2 = gen({count: 20});
        v1.upvote();
        assert.equal(v1.count(), 11);
        assert.equal(v1.upvoted(), true);
        assert.equal(v2.count(), 20);
        assert.equal(v2.upvoted(), false);
      });

      it('should get downvoted independently', () => {
        const v1 = gen({count: 10});
        const v2 = gen({count: 20});
        v1.downvote();
        assert.equal(v1.count(), 9);
        assert.equal(v1.downvoted(), true);
        assert.equal(v2.count(), 20);
        assert.equal(v2.downvoted(), false);
      });

      it('should get starred independently', () => {
        const v1 = gen({count: 10});
        const v2 = gen({count: 20});
        v1.star();
        assert.equal(v1.starred(), true);
        assert.equal(v2.starred(), false);
      });
    });

    describe('callback', () => {
      var receivedPayload;
      const callback = payload => receivedPayload = payload;

      const obj1_origCount = 10;
      const obj1 = gen({count: obj1_origCount, callback: callback});
      const obj1_id = obj1.id;

      const obj2_origCount = 20;
      const obj2 = gen({count: obj2_origCount, callback: callback});
      const obj2_id = obj2.id;

      it('should get triggered with correct payload on obj1.upvote', () => {
        obj1.upvote();
        assert.deepEqual(receivedPayload, {
          id: obj1_id,
          action: 'upvote',
          newState: {
            count: obj1_origCount + 1,
            downvoted: false,
            upvoted: true,
            starred: false
          }
        });
      });

      it('should get triggered with correct payload on obj2.upvote', () => {
        obj2.upvote();
        assert.deepEqual(receivedPayload, {
          id: obj2_id,
          action: 'upvote',
          newState: {
            count: obj2_origCount + 1,
            downvoted: false,
            upvoted: true,
            starred: false
          }
        });
      });

      it('should get triggered with correct payload on obj1.upvote', () => {
        obj1.upvote();
        assert.deepEqual(receivedPayload, {
          id: obj1_id,
          action: 'unupvote',
          newState: {
            count: obj1_origCount,
            downvoted: false,
            upvoted: false,
            starred: false
          }
        });
      });

      it('should get triggered with correct payload on obj2.star', () => {
        obj2.star();
        assert.deepEqual(receivedPayload, {
          id: obj2_id,
          action: 'star',
          newState: {
            count: obj2_origCount + 1,
            downvoted: false,
            upvoted: true,
            starred: true
          }
        });
      });

      it('should get triggered with correct payload on obj2.star', () => {
        obj2.star();
        assert.deepEqual(receivedPayload, {
          id: obj2_id,
          action: 'unstar',
          newState: {
            count: obj2_origCount + 1,
            downvoted: false,
            upvoted: true,
            starred: false
          }
        });
      });

      it('should get triggered with correct payload on obj2.downvote', () => {
        obj2.downvote();
        assert.deepEqual(receivedPayload, {
          id: obj2_id,
          action: 'downvote',
          newState: {
            count: obj2_origCount - 1,
            downvoted: true,
            upvoted: false,
            starred: false
          }
        });
      });

      it('should get triggered with correct payload on obj2.downvote', () => {
        obj2.downvote();
        assert.deepEqual(receivedPayload, {
          id: obj2_id,
          action: 'undownvote',
          newState: {
            count: obj2_origCount,
            downvoted: false,
            upvoted: false,
            starred: false
          }
        });
      });
    });

    describe('changes to model should propagate to UI', () => {
      const obj = gen();
      const ui = uiTester(obj);

      it('should increment count on upvote', () => {
        obj.upvote();
        assert.equal(ui.count(), 1);
        assert.equal(ui.upvoted(), true);
      });

      it('should decrement count on downvote', () => {
        obj.downvote();
        assert.equal(ui.count(), -1);
        assert.equal(ui.upvoted(), false);
        assert.equal(ui.downvoted(), true);
      });

      it('should un-downvote, upvote, and increment count on upvote', () => {
        obj.upvote();
        assert.equal(ui.count(), 1);
        assert.equal(ui.upvoted(), true);
        assert.equal(ui.downvoted(), false);
      });

      it('should toggle starred state on star', () => {
        obj.star();
        assert.equal(ui.starred(), true);
      });

      it('should clear starred state on star again', () => {
        obj.star();
        assert.equal(ui.starred(), false);
      });
    });

    describe('changes by user should propagate to model', () => {
      const obj = gen();
      const ui = uiTester(obj);

      it('should increment count on upvote', () => {
        ui.upvote();
        assert.equal(obj.count(), 1);
        assert.equal(obj.upvoted(), true);
      });

      it('should decrement count on downvote', () => {
        ui.downvote();
        assert.equal(obj.count(), -1);
        assert.equal(obj.upvoted(), false);
        assert.equal(obj.downvoted(), true);
      });

      it('should un-downvote, upvote, and increment count on upvote', () => {
        ui.upvote();
        assert.equal(obj.count(), 1);
        assert.equal(obj.upvoted(), true);
        assert.equal(obj.downvoted(), false);
      });

      it('should toggle starred state on star', () => {
        ui.star();
        assert.equal(obj.starred(), true);
      });

      it('should clear starred state on star again', () => {
        ui.star();
        assert.equal(obj.starred(), false);
      });
    });

    describe('associating multiple models to same id', () => {
      it('should throw', () => {
        const orig = gen();
        assert.throws(() => gen({id: orig.id}), /already in use by another upvote controller/);
      });
    });

    describe('after destroy', () => {
      it('should stop responding to clicks', () => {
        const obj = gen({count: 99});
        const ui = uiTester(obj);

        ui.upvote();
        assert.equal(ui.count(), 100);
        ui.upvote();
        assert.equal(ui.count(), 99);

        obj.destroy();
        ui.upvote();
        assert.equal(ui.count(), 99);
        assert.throws(() => obj.upvote());
        assert.throws(() => obj.downvote());
        assert.throws(() => obj.star());
        assert.throws(() => obj.count());
        assert.throws(() => obj.upvoted());
        assert.throws(() => obj.downvoted());
        assert.throws(() => obj.starred());

        const reused = gen({id: obj.id});
        assert.equal(reused.count(), 99);
        ui.upvote();
        assert.equal(reused.count(), 100);
      });
    });

    describe('all sub-elements (upvote/downvote/count/star) are optional in the HTML markup', () => {
      ['upvote', 'downvote', 'count', 'star'].forEach(cls => {
        it(`can be initialized without ${cls} sub-element`, () => {
          const jqdom = Utils.addNewDom();
          jqdom.find('.' + cls).remove();
          const obj = Setup.create(jqdom.attr('id'), {}, jqdom);

          assert.equal(obj.count(), 0);
          obj.upvote();
          assert.equal(obj.count(), 1);
          assert.equal(obj.upvoted(), true);
          obj.downvote();
          assert.equal(obj.count(), -1);
          assert.equal(obj.downvoted(), true);
          assert.equal(obj.upvoted(), false);
          obj.downvote();
          assert.equal(obj.count(), 0);
          assert.equal(obj.downvoted(), false);
          obj.star();
          assert.equal(obj.starred(), true);
          obj.star();
          assert.equal(obj.starred(), false);
        });
      });
    });
  }
};

if (typeof module !== 'undefined' && module.exports) {
  exports.Tests = Tests;
}
